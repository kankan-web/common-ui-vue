module.exports = {
  plugins: {
    // 自动添加浏览器前缀
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8",
        "last 2 versions",
      ],
      grid: true,
    },
    // 将现代CSS转换为大多数浏览器能理解的内容
    "postcss-preset-env": {
      // 自动polyfill
      features: {
        "nesting-rules": true,
      },
    },
    // 压缩CSS
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
