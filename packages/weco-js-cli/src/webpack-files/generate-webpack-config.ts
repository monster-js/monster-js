import Webpack from 'webpack';
import { defaultWebpackConfig } from './default-webpack-config';

export function generateWebpackConfig(mode: Webpack.Configuration['mode']) {
    const config: Webpack.Configuration = {
        ...defaultWebpackConfig,
        mode,
        optimization: {
            ...defaultWebpackConfig.optimization,
            minimize: mode === 'production'
        }
    };
    return config;
}