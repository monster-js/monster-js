import Webpack from 'webpack';
import { generateWebpackConfig } from '../webpack-files/generate-webpack-config';
import path from 'path';
import fs from 'fs';
import { getFileNameWithoutExtension } from '../utils/get-filename-without-extension';
import { toPascalCase } from '../utils/to-pascal-case';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export interface BuildProjectOptionsInterface {
    mode: Webpack.Configuration['mode'];
    output: string;
    standalone: boolean;
}

export async function buildProject(options: BuildProjectOptionsInterface) {
    const { mode, output, standalone } = options;

    console.log('Building project...');
    if (standalone) {
        const standaloneDir = path.join(process.cwd(), 'src/standalone');
        fs.readdir(standaloneDir, (err, files) => {
            if (err) {
                return console.error('Unable to read standalone directory');
            }

            const config = generateWebpackConfig(mode, output);
            const outputPath = config.output!.path + '/standalone';
            files.forEach((filePath) => {
                const filename = getFileNameWithoutExtension(filePath);
                const className = toPascalCase(filename);
                config.entry = './src/standalone/' + filePath;
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
        runBuild(config);
    }
}

function runBuild(config: Webpack.Configuration) {
    const compiler = Webpack(config);

    compiler.run((err, stats) => {
        if (err) {
            console.error(err);
        } else if (stats?.hasErrors()) {
            console.error(stats.toString('errors-only'));
        } else {
            console.log('Build completed successfully.');
        }
    });
}