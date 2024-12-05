import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { root, pathResolve } from "../utils";
import autoprefixer from "autoprefixer";

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
      },
    },
    // https://vitejs.cn/vite5-cn/config/shared-options.html#envdir
    envDir: resolve(__dirname, "../env"),
    build: {
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      target: "es2015",
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
      // 添加 PostCSS 配置
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8",
              "last 2 versions",
            ],
            grid: true,
          }),
        ],
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
