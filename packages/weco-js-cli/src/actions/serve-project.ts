import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { generateWebpackConfig } from '../webpack-files/generate-webpack-config';

interface ServeProjectOptionsInterface {
    port: number;
    mode: Webpack.Configuration['mode'];
    output: string;
}

const path = require('path');

const devServerConfig: WebpackDevServer.Configuration = {
    static: {
        directory: path.join(process.cwd()),
    },
    compress: true,
    hot: true,
};

export async function serveProject(options: ServeProjectOptionsInterface) {
    const { port, mode, output } = options;
    const config = generateWebpackConfig(options.mode, output);

    config.mode = mode;
    devServerConfig.port = port;

    const compiler = Webpack(config);
    const server = new WebpackDevServer(devServerConfig, compiler);

    console.log('Starting server...');
    await server.start();
};
