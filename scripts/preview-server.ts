import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
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

export function createPreviewServer(root: string): http.Server {
  const publicDir = path.resolve(root);
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
        const body = fs.readFileSync(fallback.file);
        writeHead(res, 404, { "Content-Type": "text/html; charset=utf-8", "Content-Length": String(body.length) });
        if (req.method === "HEAD") res.end();
        else res.end(body);
        return;
      }
      const plain = Buffer.from("Not found\n");
      writeHead(res, 404, { "Content-Type": "text/plain; charset=utf-8", "Content-Length": String(plain.length) });
      if (req.method === "HEAD") res.end();
      else res.end(plain);
      return;
    }

    const body = fs.readFileSync(hit.file);
    writeHead(res, 200, { "Content-Type": hit.contentType, "Content-Length": String(body.length) });
    if (req.method === "HEAD") res.end();
    else res.end(body);
  });
}

/** CrossComm preview default. 4173 is an unrelated local site; do not bind it. */
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
