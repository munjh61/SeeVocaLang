// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://ec2-13-125-250-93.ap-northeast-2.compute.amazonaws.com", // 로컬 백엔드 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
