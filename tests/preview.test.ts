import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import { afterEach, describe, expect, it } from "vitest";
import { chooseEncoding, createBodyCache, createPreviewServer, listenPreview, previewPort } from "../scripts/preview-server";

const SECRET = "UNIQUE-SECRET-SHOULD-NOT-LEAK";

function request(
  port: number,
  method: string,
  urlPath: string,
  headers?: Record<string, string>,
): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: string; raw: Buffer }> {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: "127.0.0.1", port, path: urlPath, method, headers }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => {
        const raw = Buffer.concat(chunks);
        resolve({ status: res.statusCode ?? 0, headers: res.headers, body: raw.toString("utf8"), raw });
      });
    });
    req.on("error", reject);
    req.end();
  });
}

describe("preview port", () => {
  it("defaults to 4187 and never assumes 4173 is free", () => {
    expect(previewPort({})).toBe(4187);
    expect(previewPort({ PREVIEW_PORT: "0" })).toBe(0);
    expect(previewPort({ PREVIEW_PORT: "nope" })).toBe(4187);
  });
});

describe("preview server", () => {
  let server: http.Server | undefined;
  let dir: string | undefined;

  afterEach(async () => {
    if (server) {
      await new Promise<void>((resolve) => server?.close(() => resolve()));
      server = undefined;
    }
    if (dir) fs.rmSync(dir, { recursive: true, force: true });
  });

  it("serves files with the right type, redirects directories, and never falls back to the homepage", async () => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "crosscomm-preview-"));
    const outside = path.join(os.tmpdir(), `crosscomm-secret-${process.pid}.txt`);
    fs.writeFileSync(outside, SECRET);
    fs.writeFileSync(path.join(dir, "index.html"), "<h1>Home page</h1>");
    fs.mkdirSync(path.join(dir, "services"));
    fs.writeFileSync(path.join(dir, "services/index.html"), "<h1>Services page</h1>");
    fs.writeFileSync(path.join(dir, "404.html"), "<h1>Missing page</h1>");
    fs.writeFileSync(path.join(dir, "og.png"), Buffer.from([137, 80, 78, 71]));
    fs.writeFileSync(path.join(dir, "note.txt"), "hello");
    fs.writeFileSync(path.join(dir, "unknown.bin"), "bin");
    fs.writeFileSync(path.join(dir, "café.txt"), "tea");
    fs.symlinkSync(outside, path.join(dir, "escape.txt"));

    server = createPreviewServer(dir);
    await listenPreview(server, 0);
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("preview port missing");
    const port = address.port;

    const home = await request(port, "GET", "/");
    expect(home.status).toBe(200);
    expect(home.headers["content-type"]).toContain("text/html");
    expect(home.headers["x-content-type-options"]).toBe("nosniff");
    expect(String(home.headers["x-robots-tag"])).toContain("noindex");
    expect(home.body).toContain("Home page");

    const slash = await request(port, "GET", "/services");
    expect(slash.status).toBe(308);
    expect(slash.headers.location).toBe("/services/");
    const kept = await request(port, "GET", "/services?from=ad");
    expect(kept.headers.location).toBe("/services/?from=ad");
    const services = await request(port, "GET", "/services/");
    expect(services.status).toBe(200);
    expect(services.body).toContain("Services page");

    const missing = await request(port, "GET", "/not-a-real-page");
    expect(missing.status).toBe(404);
    expect(missing.body).toContain("Missing page");
    expect(missing.body).not.toContain("Home page");

    const png = await request(port, "GET", "/og.png");
    expect(png.status).toBe(200);
    expect(png.headers["content-type"]).toBe("image/png");
    expect((await request(port, "GET", "/note.txt")).headers["content-type"]).toContain("text/plain");
    expect((await request(port, "GET", "/unknown.bin")).headers["content-type"]).toBe("application/octet-stream");
    expect((await request(port, "GET", "/og.png/")).status).toBe(404);

    const head = await request(port, "HEAD", "/");
    expect(head.status).toBe(200);
    expect(head.body).toBe("");

    expect((await request(port, "POST", "/")).status).toBe(405);
    expect((await request(port, "GET", "/%2e%2e/package.json")).status).toBe(400);
    expect((await request(port, "GET", "/images/%2e%2e%2fsecret.txt")).status).toBe(400);
    expect((await request(port, "GET", "/%00")).status).toBe(400);
    expect((await request(port, "GET", "/%")).status).toBe(400);

    const encodedDot = await request(port, "GET", "/%252e%252e/secret.txt");
    expect(encodedDot.status).toBe(404);
    expect(encodedDot.body).not.toContain(SECRET);

    const escaped = await request(port, "GET", "/escape.txt");
    expect(escaped.status).toBe(400);
    expect(escaped.body).not.toContain(SECRET);
    expect(escaped.body).toBe("Bad path\n");

    const unicode = await request(port, "GET", `/${encodeURIComponent("café.txt")}`);
    expect(unicode.status).toBe(200);
    expect(unicode.body).toBe("tea");

    fs.rmSync(outside, { force: true });
  });

  it("negotiates brotli for text and keeps identity when gzip is refused", async () => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "crosscomm-preview-"));
    const html = `<h1>${"compressible text ".repeat(40)}</h1>`;
    fs.writeFileSync(path.join(dir, "index.html"), html);
    fs.writeFileSync(path.join(dir, "mark.png"), Buffer.from([137, 80, 78, 71, 1, 2, 3, 4]));
    fs.writeFileSync(path.join(dir, "404.html"), "missing");

    server = createPreviewServer(dir);
    await listenPreview(server, 0);
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("preview port missing");
    const port = address.port;

    const encoded = await request(port, "GET", "/", { "Accept-Encoding": "gzip, br" });
    expect(encoded.status).toBe(200);
    expect(encoded.headers["content-encoding"]).toBe("br");
    expect(encoded.headers.vary).toBe("Accept-Encoding");
    expect(encoded.headers["content-length"]).toBe(String(encoded.raw.length));
    expect(encoded.raw.length).toBeLessThan(Buffer.byteLength(html));
    expect(zlib.brotliDecompressSync(encoded.raw).toString("utf8")).toBe(html);

    const refused = await request(port, "HEAD", "/", { "Accept-Encoding": "gzip;q=0, br;q=0, identity" });
    expect(refused.status).toBe(200);
    expect(refused.raw.length).toBe(0);
    expect(refused.headers["content-encoding"]).toBeUndefined();
    expect(refused.headers["content-length"]).toBe(String(Buffer.byteLength(html)));
    expect(refused.headers.vary).toBe("Accept-Encoding");

    fs.writeFileSync(path.join(dir, "index.html"), "<h1>replaced</h1>");
    const fresh = await request(port, "GET", "/", { "Accept-Encoding": "br" });
    expect(zlib.brotliDecompressSync(fresh.raw).toString("utf8")).toBe("<h1>replaced</h1>");

    const image = await request(port, "GET", "/mark.png", { "Accept-Encoding": "br, gzip" });
    expect(image.status).toBe(200);
    expect(image.headers["content-encoding"]).toBeUndefined();
    expect(image.headers["content-length"]).toBe("8");
    expect(image.raw.equals(Buffer.from([137, 80, 78, 71, 1, 2, 3, 4]))).toBe(true);
  });
});

describe("encoding cache", () => {
  it("reuses a body only for the same bytes and stays within its limit", () => {
    const cache = createBodyCache(2);
    const first = Buffer.from("alpha ".repeat(30));
    const again = cache.encode(first, "br");
    expect(cache.encode(first, "br")).toBe(again);
    const second = cache.encode(Buffer.from("beta ".repeat(30)), "br");
    expect(second.equals(again)).toBe(false);
    expect(zlib.brotliDecompressSync(second).toString("utf8")).toBe("beta ".repeat(30));
    cache.encode(Buffer.from("gamma ".repeat(30)), "br");
    expect(cache.size).toBe(2);
    expect(cache.encode(first, "br")).not.toBe(again);
    expect(zlib.brotliDecompressSync(cache.encode(Buffer.from("gamma ".repeat(30)), "br")).toString("utf8")).toBe("gamma ".repeat(30));
  });
});

describe("chooseEncoding", () => {
  it("honors q=0 and prefers brotli when quality ties", () => {
    expect(chooseEncoding(undefined)).toBe("identity");
    expect(chooseEncoding("gzip;q=0, br;q=0, identity;q=0")).toBe("none");
    expect(chooseEncoding("gzip;q=0")).toBe("identity");
    expect(chooseEncoding("gzip, br")).toBe("br");
    expect(chooseEncoding("br;q=0, gzip")).toBe("gzip");
  });
});
