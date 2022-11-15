const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {

  let environment = "src/environments/environment.ts";
  if (env.environment) environment = `src/environments/environment.${env.environment}.ts`;

  return {
    mode: "production",
    entry: {
      index: "./src/index.ts",
      polyfill: "./src/polyfill.ts",
    },
    optimization: {
      usedExports: true,
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: "src/index.html", to: "" }],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            {
              loader: "style-loader",
              options: {
                injectType: "lazyStyleTag",
                // Do not forget that this code will be used in the browser and
                // not all browsers support latest ECMA features like `let`, `const`, `arrow function expression` and etc,
                // we recommend use only ECMA 5 features,
                // but it is depends what browsers you want to support
                insert: function (element, options) {
                  var parent = options.target || document.head;
                  parent.appendChild(element);
                },
              },
            },
            // Translates CSS into CommonJS
            "css-loader",
            // Transform css using MonsterJS css transformer
            "@monster-js/transformer/css",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.tsx$/,
          use: "@monster-js/transformer",
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    devServer: {
      static: "./src",
      historyApiFallback: {
        index: "index.html",
      },
      port: 4000,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss"],
      alias: {
        [path.resolve("src/environments/environment")]: path.resolve(environment),
      },
    },
    devtool: "source-map",
  };
};
