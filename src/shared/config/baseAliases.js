import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const rootDir = path.resolve(__dirname, "../../..");

const baseAliases = {
	react: path.resolve(rootDir, "node_modules/react"),
	"react-dom": path.resolve(rootDir, "node_modules/react-dom"),
	"@shared": path.resolve(rootDir, "src/shared"),
	"@portfolio": path.resolve(rootDir, "src/apps/portfolio"),
	"@pixel": path.resolve(rootDir, "src/apps/pixel-adventure"),
};

export default baseAliases;
