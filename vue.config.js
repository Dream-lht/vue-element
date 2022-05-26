const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        components: "@/components",
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["less-loader", "style-loader", "css-loader"],
          exclude: [path.resolve(__dirname, "node_modules")],
        },
      ],
    },
  },
};
