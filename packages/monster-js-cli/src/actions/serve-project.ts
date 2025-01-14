import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { generateWebpackConfig } from '../webpack-files/generate-webpack-config';
import { getMonsterConfig } from '../utils/get-monster-config';
import { info } from '../utils/logger';

interface ServeProjectOptionsInterface {
    port: number;
    mode: Webpack.Configuration['mode'];
}

const path = require('path');

const devServerConfig: WebpackDevServer.Configuration = {
    static: {
        directory: path.join(process.cwd()),
        publicPath: '/'
    },
    historyApiFallback: {
      index: 'index.html'
    },
    compress: true,
    hot: true,
};

export async function serveProject(options: ServeProjectOptionsInterface) {

    const wecoConfig = getMonsterConfig();
    if (!wecoConfig) return;

    const { port, mode } = options;
    const config = generateWebpackConfig(options.mode, 'dist');

    config.mode = mode;
    devServerConfig.port = port;

    const compiler = Webpack(config);
    const server = new WebpackDevServer(devServerConfig, compiler);

    info('Starting server...');
    await server.start();
};
