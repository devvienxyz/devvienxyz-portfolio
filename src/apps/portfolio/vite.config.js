import { createAppConfig } from "@shared/config/vite.factory.js";

export default createAppConfig({
	appName: "portfolio",
	alias: {},
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
});
