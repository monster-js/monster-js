const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (config) => {
    const environment = config.environment ? "." + config.environment : "";
    const port = config.port || 4000;
    const open = config.open === true || config.open === "true";
    const output = config.output || "dist";

    return {
        mode: "development",
        entry: "./src/index.ts",
        output: {
        path: path.join(__dirname, output),
            filename: "bundle.js",
            publicPath: "/",
            clean: true,
        },
        devServer: {
            static: {
                directory: path.join(__dirname, "src"),
            },
            open,
            compress: true,
            port,
            historyApiFallback: {
                index: "index.html",
            },
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: "src/index.html", to: "" },
                    { from: "src/assets", to: "assets" },
                ],
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg|ico)$/i,
                    use: [
                        { loader: 'file-loader' }
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ["@monster-js/transformer/css", "sass-loader"],
                    include: [path.resolve(process.cwd(), "src")],
                    exclude: [path.resolve(process.cwd(), "src/assets")],
                },
                {
                    test: /\.(?:js|mjs|cjs|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-env", { targets: "defaults" }],
                                "@babel/preset-typescript",
                            ],
                            plugins: [
                                "module:@monster-js/transformer",
                                "babel-plugin-transform-typescript-metadata",
                                ["@babel/plugin-proposal-decorators", { legacy: true }],
                            ],
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: [".ts", ".js", ".tsx"],
            alias: {
                [path.resolve(__dirname, "src/environments/environment")]: path.resolve(
                    __dirname,
                    `src/environments/environment${environment}.ts`
                ),
            },
        },
         devtool: "source-map"
    };
};
