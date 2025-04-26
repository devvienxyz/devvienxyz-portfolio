
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import baseConfig from '@packages/config/vite.base';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
    ...baseConfig,
		plugins: [
      ...baseConfig.plugins,
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
			tailwindcss(),
		],
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