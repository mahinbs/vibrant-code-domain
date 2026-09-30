import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

/**
 * The untouched index.html, kept as dist/app-shell.html: every route that is not pre-rendered
 * falls back to it (vercel.json), while dist/index.html becomes the pre-rendered home page.
 * Written by the build itself so the fallback exists even if pre-rendering is skipped.
 */
const appShell = () => ({
  name: "bms-app-shell",
  apply: "build" as const,
  closeBundle() {
    const dist = path.resolve(__dirname, "dist");
    const index = path.join(dist, "index.html");
    if (fs.existsSync(index)) fs.copyFileSync(index, path.join(dist, "app-shell.html"));
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    appShell(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["axios", "react-signature-canvas"],
  },
}));
