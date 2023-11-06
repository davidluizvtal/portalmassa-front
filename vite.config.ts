import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
//import * as pkg from "./package.json";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src", "components/"),
      "@pages": resolve(__dirname, "src", "pages/"),
      "@core": resolve(__dirname, "src", "core/"),
      "@styles": resolve(__dirname, "src", "styles/"),
      "@constants": resolve(__dirname, "src", "constants/"),
      "@services": resolve(__dirname, "src", "services/"),
      "@helpers": resolve(__dirname, "src", "helpers/"),
      "@shared": resolve(__dirname, "src", "shared/"),
      "@store": resolve(__dirname, "src", "store/"),
    },
  },
  envDir: ".",
});
