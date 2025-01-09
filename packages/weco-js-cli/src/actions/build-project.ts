import Webpack from 'webpack';
import { generateWebpackConfig } from '../webpack-files/generate-webpack-config';
import path from 'path';
import fs from 'fs';
import { getFileNameWithoutExtension } from '../utils/get-filename-without-extension';
import { toPascalCase } from '../utils/to-pascal-case';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { getWecoConfig } from '../utils/get-weco-config';
import { error, info, success } from '../utils/logger';

export interface BuildProjectOptionsInterface {
    mode: Webpack.Configuration['mode'];
    output: string;
    standalone: boolean;
}

export async function buildProject(options: BuildProjectOptionsInterface) {

    const wecoConfig = getWecoConfig();
    if (!wecoConfig) return;

    const { mode, output, standalone } = options;

    info('Building project...');
    if (standalone) {
        const standaloneDir = path.join(process.cwd(), wecoConfig.standaloneDir);
        fs.readdir(standaloneDir, (err, files) => {
            if (err) {
                return error('Unable to read standalone directory');
            }

            const config = generateWebpackConfig(mode, output);
            const outputPath = config.output!.path + '/standalone';
            files.forEach((filePath) => {
                const filename = getFileNameWithoutExtension(filePath);
                const className = toPascalCase(filename);
                config.entry = `./${wecoConfig.standaloneDir}/${filePath}`;
                config.output!.library = {
                    export: 'default',
                    name: className,
                    type: 'var',
                };
                config.output!.filename = filename + '.js';
                config.output!.libraryTarget = 'var';
                config.output!.environment = {
                    arrowFunction: false,
                    module: false
                }
                config.output!.path = outputPath;
                runBuild(config);
            });
        });
    } else {
        const config = generateWebpackConfig(mode, output, [
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.resolve(process.cwd(), 'index.html'), to: '' }, // Copy index.html to the root of dist
                ],
            }),
        ]);
        config.output!.path += '/app';
        config.stats = {
            assets: true,        // Include information about assets
            assetsSort: 'size',  // Sort assets by size
            modules: false,      // Hide module details (optional)
            colors: true,        // Add colors to the output
            entrypoints: false,  // Hide entry point details (optional)
        }

        runBuild(config);
    }
}

function runBuild(config: Webpack.Configuration) {
    const compiler = Webpack(config);

    compiler.run((err, stats) => {
        if (err) {
            console.error(err);
        } else if (stats?.hasErrors()) {
            error(stats.toString('errors-only'))
        } else {
            console.log('');
            console.log(stats?.toString({
                assets: true,
                colors: true,
                modules: false,
                entrypoints: false,
            }));
            console.log('');
            success('Build completed successfully.');
        }
    });
}
