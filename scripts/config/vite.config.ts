import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { root, pathResolve } from "../utils";
import legacy from "@vitejs/plugin-legacy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "../env");
  return {
    //https://vitejs.cn/vite5-cn/config/shared-options.html#base
    base: env.VITE_BASE_URL,
    server: {
      port: 3000,
      open: true,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "../../src"),
        "@assets": resolve(__dirname, "../../src/assets"),
        "@components": resolve(__dirname, "../../src/components"),
        "@styles": resolve(__dirname, "../../src/styles"),
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      legacy({
        targets: ["ie >= 11", "chrome 52", "Android 4.1", "iOS 7.1"],
        modernPolyfills: true,
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        renderLegacyChunks: true,
        polyfills: true,
      }),
    ],
    // https://vitejs.cn/vite5-cn/config/shared-options.html#envdir
    envDir: resolve(__dirname, "../env"),
    build: {
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      target: ["es2015", "chrome52"],

      sourcemap: false,
      // 消除打包大小超过500kb警告
      // chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve("/index.html", import.meta.url),
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },

    css: {
      // 开启 CSS source maps
      devSourcemap: true,

      // CSS 预处理器配置
      preprocessorOptions: {
        scss: {
          // 全局引入变量和 mixin
          additionalData: `
            @import "@/styles/variables.scss";
            @import "@/styles/mixins.scss";
          `,
        },
        less: {
          // less 配置
          javascriptEnabled: true,
          // 定义全局变量
          modifyVars: {
            "primary-color": "#1890ff",
          },
        },
      },

      // CSS 模块化配置
      modules: {
        // 自定义生成的类名
        generateScopedName:
          mode === "development"
            ? "[name]__[local]__[hash:base64:5]"
            : "[hash:base64:8]",
      },
    },
  };
});
