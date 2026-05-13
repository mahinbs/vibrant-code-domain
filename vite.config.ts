import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react") || id.includes("scheduler")) return "vendor-react";
          if (id.includes("react-router-dom")) return "vendor-router";
          if (id.includes("@tanstack/react-query")) return "vendor-query";
          if (
            id.includes("@radix-ui") ||
            id.includes("cmdk") ||
            id.includes("embla-carousel-react") ||
            id.includes("vaul")
          ) {
            return "vendor-ui";
          }
          if (id.includes("gsap")) return "vendor-gsap";
          if (
            id.includes("recharts") ||
            id.includes("date-fns") ||
            id.includes("@supabase/supabase-js")
          ) {
            return "vendor-data";
          }
          return "vendor";
        },
      },
    },
  },
  optimizeDeps: {
    include: ["axios", "react-signature-canvas"],
  },
}));
