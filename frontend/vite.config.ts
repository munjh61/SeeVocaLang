import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://ec2-13-125-250-93.ap-northeast-2.compute.amazonaws.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  esbuild: mode === "production" ? { drop: ["console", "debugger"] } : {},
}));
