import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "src/shared"),
      "@pixel": path.resolve(__dirname, "src/apps/pixel-adventure"),
      "@portfolio": path.resolve(__dirname, "src/apps/portfolio"),
    },
  },
  test: {
    globals: true, // auto imports describe/it/expect
    environment: "jsdom", // for DOM APIs (important for React)
    // include: ["src/**/*.{test,spec}.{js,jsx}"], // find tests properly
    // exclude: ["node_modules", "dist"], // ignore junk
    coverage: {
      reporter: ["text", "html"],
      exclude: ["**/node_modules/**", "**/dist/**"],
    },
  },
});
