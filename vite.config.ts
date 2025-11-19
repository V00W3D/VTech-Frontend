import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@store": path.resolve(__dirname, "src/store"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@config": path.resolve(__dirname, "src/app/config"),
      "@components": path.resolve(__dirname, "src/components"),
      "@CSS": path.resolve(__dirname, "src/CSS"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@common": path.resolve(__dirname, "src/common"),
      "@main": path.resolve(__dirname, "src/main.tsx"),
      "@app": path.resolve(__dirname, "src/App.tsx"),
      "@api": path.resolve(__dirname, "src/api.ts"),
      "@endpoints": path.resolve(__dirname, "src/endpoints"),
      "@services": path.resolve(__dirname, "src/services"),
    },
  },
});
