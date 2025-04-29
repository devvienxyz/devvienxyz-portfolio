import path from "path";
import { fileURLToPath } from "url";
import { createAppConfig } from "@shared/config/vite.factory.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default createAppConfig({
	appName: "pixel",
	alias: {
		"@state": path.resolve(__dirname, "state"),
		"@engine": path.resolve(__dirname, "engine"),
		"@components": path.resolve(__dirname, "components"),
	},
});
