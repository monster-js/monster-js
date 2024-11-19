import path from 'path';
import Webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

export const getDefaultWebpackConfig = (additionalConfig: any[] = []): Webpack.Configuration => ({
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
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve('babel-loader'),
                    options: {
                        presets: [
                            require.resolve('@babel/preset-env'),
                            require.resolve('@babel/preset-typescript')
                        ],
                        plugins: [require.resolve('weco-js-transformers')],
                        compact: false,
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: false,
        minimizer: [new TerserPlugin()],
    },
});
