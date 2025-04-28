import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createAppConfig = ({ appName, alias = {}, pwaManifest = {} }) =>
	defineConfig(({ mode }) => {
		const env = loadEnv(mode, process.cwd(), "");

		return {
			plugins: [
				react(),
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
				tailwindcss(),
			],
			resolve: {
				alias: {
					react: path.resolve(__dirname, "../../../node_modules/react"),
					"react-dom": path.resolve(__dirname, "../../../node_modules/react-dom"),
					"@portfolio": path.resolve(__dirname, "../../../src/apps/portfolio"),
					"@pixel": path.resolve(__dirname, "../../../src/apps/pixel-adventure"),
					"@shared": path.resolve(__dirname, "../../../src/shared"),
					...alias,
				},
				dedupe: ["react", "react-dom"],
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
		};
	});
