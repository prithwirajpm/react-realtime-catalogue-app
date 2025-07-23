import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/catalogueHub": {
        target: "https://admintest.xeniacatalogue.info",
        changeOrigin: true,
        ws: true,
        secure: false,
      },
    },
  },
});
