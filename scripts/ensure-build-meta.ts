/**
 * Writes a local fallback only when client/src/generated/build-meta.ts is absent.
 * scripts/build.ts replaces it before both bundles. The file is gitignored.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveOrigins } from "../client/src/site-config.ts";
import { renderBuildMetaSource } from "./build.ts";

export const BUILD_META_PATH = path.join("client/src/generated/build-meta.ts");

export function ensureBuildMeta(root = process.cwd()): "present" | "written" {
  const file = path.join(root, BUILD_META_PATH);
  if (fs.existsSync(file)) return "present";
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(
    file,
    renderBuildMetaSource({
      release: "local",
      builtAt: "1970-01-01T00:00:00.000Z",
      origins: resolveOrigins({}),
    }),
  );
  return "written";
}

function isDirectRun(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  return path.resolve(entry) === path.resolve(fileURLToPath(import.meta.url));
}

if (isDirectRun()) ensureBuildMeta();
