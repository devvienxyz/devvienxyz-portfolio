import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import baseAliases, { rootDir } from "./baseAliases.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createAppConfig = ({ appName, alias = {}, pwaManifest = {}, base = "./" }) =>
	defineConfig(({ mode }) => {
		const env = loadEnv(mode, process.cwd(), "");

		const resolvedConfig = {
			base,
			publicDir: path.resolve(rootDir, "public"),
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
					...baseAliases,
					...alias,
				},
				dedupe: ["react", "react-dom"],
			},
			build: {
				sourcemap: false,
				outDir: "dist",
				format: "es",
				rollupOptions: {
					output: {
						manualChunks(id) {
							if (id.includes("node_modules")) return "vendor";
						},
					},
				},
			},
		};

		return resolvedConfig;
	});
