"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultWebpackConfig = void 0;
const path_1 = __importDefault(require("path"));
const terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
const getDefaultWebpackConfig = (additionalConfig = []) => {
    global['__GLOBAL_MONSTER_ELEMENT_ID_COUNTER'] = 0;
    global['__GLOBAL_MONSTER_ELEMENT_IDS'] = {};
    return {
        entry: './src/main.ts',
        output: {
            filename: 'bundle.js',
            path: path_1.default.resolve(process.cwd(), 'dist'),
        },
        mode: 'production',
        resolve: {
            extensions: ['.ts', '.tsx', '.js'], // Resolve .ts and .js extensions
        },
        plugins: [
            ...additionalConfig,
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i, // Match SCSS files
                    use: [
                        require.resolve('css-loader'), // Resolves CSS imports
                        require.resolve('./css-transformer.js'),
                        require.resolve('sass-loader'), // Compiles SCSS to CSS
                    ],
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: require.resolve('babel-loader'),
                        options: {
                            presets: [
                                require.resolve('@babel/preset-env'),
                                require.resolve('@babel/preset-typescript')
                            ],
                            plugins: [
                                path_1.default.join(__dirname, './jsx-transformer.js'),
                            ],
                            compact: false,
                        },
                    },
                },
            ],
        },
        optimization: {
            minimize: true,
            minimizer: [
                new terser_webpack_plugin_1.default({
                    terserOptions: {
                        ecma: 2015,
                        compress: {
                            unused: true, // Remove unused code
                            dead_code: true, // Remove dead code
                            passes: 20, // Optimize further with multiple passes
                        },
                        mangle: {
                            toplevel: true,
                            properties: {
                                regex: /^_/,
                            }
                        },
                        format: {
                            beautify: false, // Beautify the output
                            comments: false, // Remove comments
                        },
                    },
                })
            ],
        },
    };
};
exports.getDefaultWebpackConfig = getDefaultWebpackConfig;
//# sourceMappingURL=get-default-webpack-config.js.map