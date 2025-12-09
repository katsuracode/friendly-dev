import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import vercel from "vite-plugin-vercel";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), devtoolsJson(), vercel()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8300",
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true,
      },
    },
  },
});
