import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react-swc";
// import tailwindcss from "tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [
			react(),
			VitePWA({
				registerType: "autoUpdate",
				manifest: {
					name: "Devvienxyz's Portfolio",
					short_name: "devvienxyz-portfolio",
					start_url: "/",
					display: "standalone",
					theme_color: "#ff385c",
					background_color: "#ffffff",
					icons: [
						{
							src: "/icons/icon-192x192.png",
							sizes: "192x192",
							type: "image/png",
						},
						{
							src: "/icons/icon-512x512.png",
							sizes: "512x512",
							type: "image/png",
						},
					],
				},
			}),
			// tailwindcss(),
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "apps"),
				"@assets": path.resolve(__dirname, "assets"),
				"@packages": path.resolve(__dirname, "packages"),
				"@controller": path.resolve(__dirname, "apps/controller"),
				"@pixel": path.resolve(__dirname, "apps/pixeladventure"),
			},
		},
		build: {
			sourcemap: false, // Disable source maps in production
			outDir: "dist",
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes("node_modules")) {
							return "vendor";
						}
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
