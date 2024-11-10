import Webpack from 'webpack';
import { generateWebpackConfig } from '../webpack-files/generate-webpack-config';

export interface BuildProjectOptionsInterface {
    mode: Webpack.Configuration['mode'];
}

export async function buildProject(options: BuildProjectOptionsInterface) {
    const mode = options.mode;
    const config = generateWebpackConfig(options.mode);

    config.mode = mode;

    const compiler = Webpack(config);

    console.log('Building project...');
    return new Promise<void>((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                console.error(err);
                reject(err);
            } else if (stats?.hasErrors()) {
                console.error(stats.toString('errors-only'));
                reject(new Error('Build failed with errors.'));
            } else {
                console.log('Build completed successfully.');
                resolve();
            }
        });
    });
}
