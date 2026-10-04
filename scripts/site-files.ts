import fs from "node:fs";
import path from "node:path";

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
  ".map": "application/json; charset=utf-8",
};

export function contentType(filePath: string): string {
  return MIME[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
}

export type PublicHit =
  | { status: 400 }
  | { status: 404 }
  | { status: 308; location: string }
  | { status: 200; file: string; contentType: string };

function insideRoot(root: string, candidate: string): boolean {
  const prefix = root.endsWith(path.sep) ? root : `${root}${path.sep}`;
  return candidate === root || candidate.startsWith(prefix);
}

function safeReal(root: string, candidate: string): string | null {
  try {
    const realRoot = fs.realpathSync(root);
    const realFile = fs.realpathSync(candidate);
    return insideRoot(realRoot, realFile) ? realFile : null;
  } catch {
    return null;
  }
}

export function splitRequestUrl(raw: string): { pathname: string; search: string } | null {
  const withoutHash = raw.split("#")[0] ?? "";
  if (!withoutHash.startsWith("/")) return null;
  const queryAt = withoutHash.indexOf("?");
  if (queryAt === -1) return { pathname: withoutHash, search: "" };
  return { pathname: withoutHash.slice(0, queryAt), search: withoutHash.slice(queryAt) };
}

/**
 * Map a URL path onto a file inside `root`.
 * Decoded `..` segments, null bytes, backslashes, and symlinks that leave `root` are rejected.
 * A directory URL without a trailing slash redirects; it is never served as the homepage.
 */
export function resolvePublic(root: string, rawPathname: string): PublicHit {
  const rootResolved = path.resolve(root);
  let decoded: string;
  try {
    decoded = decodeURIComponent(rawPathname);
  } catch {
    return { status: 400 };
  }
  if (!decoded.startsWith("/") || decoded.includes("\0") || decoded.includes("\\")) return { status: 400 };
  if (decoded.split("/").some((segment) => segment === "..")) return { status: 400 };

  const trailing = decoded.length > 1 && decoded.endsWith("/");
  const relative = decoded.replace(/^\/+/, "").replace(/\/+$/, "");
  const target = path.resolve(rootResolved, relative);
  if (!insideRoot(rootResolved, target)) return { status: 400 };

  if (relative === "") {
    const index = path.join(rootResolved, "index.html");
    const real = fs.existsSync(index) ? safeReal(rootResolved, index) : null;
    return real ? { status: 200, file: real, contentType: contentType(index) } : { status: 404 };
  }

  let stat: fs.Stats | null = null;
  try {
    stat = fs.statSync(target);
  } catch {
    stat = null;
  }

  if (!trailing && stat?.isFile()) {
    const real = safeReal(rootResolved, target);
    return real ? { status: 200, file: real, contentType: contentType(target) } : { status: 400 };
  }

  const index = path.join(target, "index.html");
  const indexExists = fs.existsSync(index) && fs.statSync(index).isFile();
  if (stat?.isDirectory() || indexExists) {
    if (!trailing) return { status: 308, location: `/${relative}/` };
    if (!indexExists) return { status: 404 };
    const real = safeReal(rootResolved, index);
    return real ? { status: 200, file: real, contentType: "text/html; charset=utf-8" } : { status: 400 };
  }

  return { status: 404 };
}
