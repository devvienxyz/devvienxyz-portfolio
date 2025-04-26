import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@portfolio": path.resolve(__dirname, "/src/apps/portfolio"),
      "@pixel": path.resolve(__dirname, "/src/apps/pixel-adventure"),
      "@assets": path.resolve(__dirname, "/src/assets"),
      "@packages": path.resolve(__dirname, "/src/packages"),
    },
  }
})
