import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(async () => {
  const plugins = [react()];

  // Only enable development-time plugins when not in production
  if (process.env.NODE_ENV !== "production") {
    try {
      const { default: runtimeErrorOverlay } = await import("@replit/vite-plugin-runtime-error-modal");
      plugins.push(runtimeErrorOverlay());
    } catch (err) {
      console.warn("Runtime error overlay plugin not available:", err);
    }

    if (process.env.REPL_ID !== undefined) {
      try {
        const { cartographer } = await import("@replit/vite-plugin-cartographer");
        plugins.push(cartographer());
      } catch (err) {
        console.warn("Cartographer plugin not available:", err);
      }
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      proxy: {
        '/api': 'http://localhost:3001',
      },
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
