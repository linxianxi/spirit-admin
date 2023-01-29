import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteMockServe()],
  server: {
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //   },
    // },
  },
});
