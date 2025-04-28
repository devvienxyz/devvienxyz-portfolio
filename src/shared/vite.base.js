import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": "/src",
			"@portfolio": path.resolve(__dirname, "src/apps/portfolio"),
			"@pixel": path.resolve(__dirname, "src/apps/pixel-adventure"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@shared": path.resolve(__dirname, "src/shared"),
		},
	},
});
