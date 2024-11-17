import path from "path";
import Webpack from 'webpack';
import { getDefaultWebpackConfig } from './get-default-webpack-config';

export function generateWebpackConfig(mode: Webpack.Configuration['mode'], output: string) {
    const defaultWebpackConfig = getDefaultWebpackConfig();
    const config: Webpack.Configuration = {
        ...defaultWebpackConfig,
        mode,
        output: {
            ...defaultWebpackConfig.output,
            path: path.resolve(process.cwd(), output),
        },
        optimization: {
            ...defaultWebpackConfig.optimization,
            minimize: mode === 'production'
        }
    };
    return config;
}