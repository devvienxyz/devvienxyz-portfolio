import path from "path";
import { fileURLToPath } from "url";
import { loadEnv, defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createAppConfig = ({
  appName,
  alias = {},
  pwaManifest = {},
}) =>
  defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
      plugins: [
        tailwindcss(),
        VitePWA({
          registerType: "autoUpdate",
          manifest: {
            name: pwaManifest.name || appName,
            short_name: pwaManifest.short_name || appName,
            start_url: "/",
            display: "standalone",
            theme_color: "#ffffff",
            background_color: "#ffffff",
            icons: pwaManifest.icons || [],
          },
        }),
      ],
      resolve: {
        alias: {
          // "@": path.resolve(__dirname, "../../../"),
          "@": "/src",
          "@portfolio": path.resolve(__dirname, "/src/apps/portfolio"),
          "@pixel": path.resolve(__dirname, "/src/apps/pixel-adventure"),
          "@assets": path.resolve(__dirname, "/src/assets"),
          "@packages": path.resolve(__dirname, "/src/packages"),
          ...alias,
        },
      },
      build: {
        sourcemap: false,
        outDir: "dist",
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes("node_modules")) return "vendor";
            },
          },
        },
      },
      server: {
        proxy: {
          "/api": {
            target: env.VITE_API_BASE_URL || "http://backend:8000",
            changeOrigin: true,
          },
        },
      },
    };
  });
