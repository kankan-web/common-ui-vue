import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { rollupInput } from "../utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  //https://vitejs.cn/vite5-cn/config/shared-options.html#base
  base: "/",
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "../../src"),
    },
  },
  build: {
    //https://vitejs.cn/vite5-cn/guide/build.html#multi-page-app
    rollupOptions: {
      input: rollupInput(),
      output: {
        dir: "dist",
        entryFileNames: (chunkInfo) => {
          const name = chunkInfo.name.replace("page", "");
          return `page${name}/assets/js/[name]-[hash].js`;
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name.replace("page", "");
          return `page${name}/assets/js/[name]-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name?.split("/")[0].replace("page", "") || "";
          return `page${name}/assets/[ext]/[name]-[hash].[ext]`;
        },
      },
    },
  },
});
