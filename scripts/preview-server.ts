import { createHash } from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";
import { resolvePublic, splitRequestUrl } from "./site-files.ts";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, follow",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cache-Control": "no-store",
};

function writeHead(res: http.ServerResponse, status: number, headers: Record<string, string>): void {
  res.writeHead(status, { ...SECURITY_HEADERS, ...headers });
}

type Coding = "br" | "gzip" | "identity";

function compressible(contentType: string): boolean {
  const mime = contentType.split(";")[0]?.trim().toLowerCase() ?? "";
  if (mime.startsWith("text/")) return true;
  return mime === "application/javascript" || mime === "text/javascript" || mime === "application/json" || mime === "application/xml" || mime === "application/manifest+json" || mime === "image/svg+xml";
}

/** Pick br, gzip, or identity. A coding with q=0 is refused. Identity is the fallback unless it is also refused. */
export function chooseEncoding(header: string | string[] | undefined): Coding | "none" {
  const raw = (Array.isArray(header) ? header.join(",") : header ?? "").trim();
  if (!raw) return "identity";
  const stated = new Map<string, number>();
  for (const part of raw.split(",")) {
    const [namePart, ...params] = part.trim().split(";");
    const name = namePart?.trim().toLowerCase() ?? "";
    if (!name) continue;
    let q = 1;
    for (const param of params) {
      const [key, value] = param.split("=");
      if (key?.trim() === "q") {
        const parsed = Number(value?.trim());
        q = Number.isFinite(parsed) ? parsed : 0;
      }
    }
    stated.set(name, q);
  }
  const star = stated.get("*");
  const quality = (name: string, absent: number): number => {
    if (stated.has(name)) return stated.get(name) ?? 0;
    if (star !== undefined) return star;
    return absent;
  };
  const options: { coding: Coding; q: number }[] = [
    { coding: "br", q: quality("br", 0) },
    { coding: "gzip", q: quality("gzip", 0) },
    { coding: "identity", q: quality("identity", 1) },
  ];
  const rank: Record<Coding, number> = { br: 0, gzip: 1, identity: 2 };
  const usable = options.filter((option) => option.q > 0).sort((a, b) => b.q - a.q || rank[a.coding] - rank[b.coding]);
  return usable[0]?.coding ?? "none";
}

/** Preview quality. Maximum Brotli (11) made the browser suite time out. */
const PREVIEW_BROTLI_QUALITY = 4;
export const PREVIEW_ENCODING_CACHE_LIMIT = 32;

export function createBodyCache(limit = PREVIEW_ENCODING_CACHE_LIMIT) {
  const entries = new Map<string, Buffer>();
  return {
    get size(): number {
      return entries.size;
    },
    encode(raw: Buffer, coding: Coding): Buffer {
      if (coding === "identity") return raw;
      const key = `${coding}:${createHash("sha256").update(raw).digest("hex")}`;
      const hit = entries.get(key);
      if (hit) {
        entries.delete(key);
        entries.set(key, hit);
        return hit;
      }
      const body = coding === "br"
        ? zlib.brotliCompressSync(raw, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: PREVIEW_BROTLI_QUALITY } })
        : zlib.gzipSync(raw);
      entries.set(key, body);
      while (entries.size > limit) {
        const oldest = entries.keys().next().value;
        if (oldest === undefined) break;
        entries.delete(oldest);
      }
      return body;
    },
  };
}

function send(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  status: number,
  contentType: string,
  raw: Buffer,
  cache: ReturnType<typeof createBodyCache>,
): void {
  const negotiated = compressible(contentType) ? chooseEncoding(req.headers["accept-encoding"]) : "identity";
  if (negotiated === "none") {
    writeHead(res, 406, { "Content-Type": "text/plain; charset=utf-8", Vary: "Accept-Encoding" });
    res.end(req.method === "HEAD" ? undefined : "Not acceptable\n");
    return;
  }
  const body = cache.encode(raw, negotiated);
  const headers: Record<string, string> = {
    "Content-Type": contentType,
    "Content-Length": String(body.length),
    Vary: "Accept-Encoding",
  };
  if (negotiated !== "identity") headers["Content-Encoding"] = negotiated;
  writeHead(res, status, headers);
  if (req.method === "HEAD") res.end();
  else res.end(body);
}

export function createPreviewServer(root: string): http.Server {
  const publicDir = path.resolve(root);
  const cache = createBodyCache();
  return http.createServer((req, res) => {
    if (!req.url || (req.method !== "GET" && req.method !== "HEAD")) {
      writeHead(res, req.method === "GET" || req.method === "HEAD" ? 400 : 405, {
        "Content-Type": "text/plain; charset=utf-8",
        Allow: "GET, HEAD",
      });
      res.end(req.method === "GET" || req.method === "HEAD" ? "Bad request\n" : "Method not allowed\n");
      return;
    }

    const parts = splitRequestUrl(req.url);
    if (!parts) {
      writeHead(res, 400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Bad path\n");
      return;
    }

    const hit = resolvePublic(publicDir, parts.pathname);
    if (hit.status === 400) {
      writeHead(res, 400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Bad path\n");
      return;
    }
    if (hit.status === 308) {
      writeHead(res, 308, { Location: `${hit.location}${parts.search}` });
      res.end();
      return;
    }
    if (hit.status === 404) {
      const missing = path.join(publicDir, "404.html");
      const fallback = resolvePublic(publicDir, "/404.html");
      if (fallback.status === 200 && fs.existsSync(missing)) {
        send(req, res, 404, "text/html; charset=utf-8", fs.readFileSync(fallback.file), cache);
        return;
      }
      send(req, res, 404, "text/plain; charset=utf-8", Buffer.from("Not found\n"), cache);
      return;
    }

    send(req, res, 200, hit.contentType, fs.readFileSync(hit.file), cache);
  });
}

/** Preview default. Override with PREVIEW_PORT. Do not attach to a server this process did not start. */
export function previewPort(env: Record<string, string | undefined> = process.env): number {
  const raw = env.PREVIEW_PORT?.trim();
  if (raw && /^[0-9]+$/.test(raw)) {
    const port = Number(raw);
    if (port >= 0 && port < 65536) return port;
  }
  return 4187;
}

export function listenPreview(server: http.Server, port: number, host = "127.0.0.1"): Promise<void> {
  return new Promise((resolve, reject) => {
    const onError = (error: Error) => {
      server.off("error", onError);
      reject(error);
    };
    server.once("error", onError);
    server.listen(port, host, () => {
      server.off("error", onError);
      resolve();
    });
  });
}

function isDirectRun(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  return path.resolve(entry) === path.resolve(fileURLToPath(import.meta.url));
}

if (isDirectRun()) {
  const publicDir = path.resolve("dist/public");
  if (!fs.existsSync(publicDir)) {
    console.error("dist/public is missing. Run pnpm build first.");
    process.exit(1);
  }
  const server = createPreviewServer(publicDir);
  const port = previewPort();
  listenPreview(server, port)
    .then(() => {
      console.log(`Preview http://127.0.0.1:${port}`);
    })
    .catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Preview server did not start: ${message}`);
      process.exit(1);
    });
}
