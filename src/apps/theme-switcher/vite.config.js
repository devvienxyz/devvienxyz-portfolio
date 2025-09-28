import baseConfig from "@shared/config/vite.base";
import { mergeConfig } from "vite";

export default mergeConfig(baseConfig, {
  root: __dirname,
  build: {
    outDir: "dist",
  },
});
