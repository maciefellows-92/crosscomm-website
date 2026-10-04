import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const stripCssForSsr: PluginOption = {
  name: "strip-css-for-node-ssr",
  enforce: "pre",
  resolveId(id) {
    if (id.endsWith(".css") || id.includes(".css?") || id.includes(".css&")) return "\0ssr-empty-css";
    return null;
  },
  load(id) {
    if (id === "\0ssr-empty-css") return "export default {}";
    return null;
  },
};

export default defineConfig(({ isSsrBuild }) => ({
  root: path.join(rootDir, "client"),
  plugins: [isSsrBuild ? stripCssForSsr : null, react(), tailwindcss()].filter((plugin) => plugin !== null),
  resolve: {
    alias: { "@": path.join(rootDir, "client/src") },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4187,
    strictPort: true,
  },
  ssr: isSsrBuild ? { noExternal: true } : undefined,
  build: isSsrBuild
    ? {
        outDir: path.join(rootDir, "dist/server"),
        emptyOutDir: true,
        ssr: true,
        rollupOptions: {
          input: path.join(rootDir, "client/src/entry-server.tsx"),
          output: {
            format: "es",
            entryFileNames: "entry-server.js",
            inlineDynamicImports: true,
          },
        },
      }
    : {
        outDir: path.join(rootDir, "dist/public"),
        emptyOutDir: true,
      },
}));
