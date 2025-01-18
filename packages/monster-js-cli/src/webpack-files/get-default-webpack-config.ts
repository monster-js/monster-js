import path from 'path';
import Webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

declare const global: any;

export const getDefaultWebpackConfig = (additionalConfig: any[] = []): Webpack.Configuration => {

    global['__GLOBAL_MONSTER_ELEMENT_ID_COUNTER'] = 0;
    global['__GLOBAL_MONSTER_ELEMENT_IDS'] = {};

    return {
        entry: './src/main.ts',
        output: {
            filename: 'bundle.js',
            path: path.resolve(process.cwd(), 'dist'),
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
                        // require.resolve('style-loader'), // Injects styles into the DOM
                        require.resolve('css-loader'),   // Resolves CSS imports
                        require.resolve('./css-transformer.js'),
                        require.resolve('sass-loader'),  // Compiles SCSS to CSS
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
                                // path.join(__dirname, './jsx-transformer.js'),
                                require.resolve('monster-js-transformers')
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
                new TerserPlugin(
                    {
                        terserOptions: {
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
                    }
                )
            ],
        },
    };
};
