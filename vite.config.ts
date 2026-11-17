import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { nitro } from "nitro/vite";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  // nitro() must stay the LAST plugin: it has to run after Vite's own
  // module-transform middleware, or its SPA fallback answers Vite-internal
  // URLs (/src/*.tsx, /@vite/client) with index.html. See AI_RULES.md.
  plugins: [dyadComponentTagger(), react(), tailwindcss(), nitro()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
}));
