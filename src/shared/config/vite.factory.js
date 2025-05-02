import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
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
							if (id.includes("node_modules")) {
								if (id.includes("react")) return "vendor-react";
								if (id.includes("three")) return "vendor-three";
								if (id.includes("zustand")) return "vendor-zustand";
								return "vendor-misc";
							}
						},
					},
					plugins: [visualizer({ open: true, filename: "dist/stats.html" })],
				},
			},
		};

		return resolvedConfig;
	});
