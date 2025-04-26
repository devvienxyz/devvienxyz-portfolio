import { createAppConfig } from "@packages/config/vite.factory.js";
import react from "@vitejs/plugin-react-swc";

export default createAppConfig({
	appName: "devvienxyz-portfolio",
	alias: {
		"@portfolio": "/src/apps/portfolio",
		"@assets": "/src/assets",
	},
	pwaManifest: {
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
}).then((config) => ({
	...config,
	plugins: [react(), ...config.plugins],
}));
