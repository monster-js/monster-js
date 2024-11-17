import Webpack from 'webpack';
import { generateWebpackConfig } from '../webpack-files/generate-webpack-config';
import { getFileNameWithoutExtension } from '../utils/get-filename-without-extension';
import { toPascalCase } from '../utils/to-pascal-case';

export interface BuildProjectOptionsInterface {
    mode: Webpack.Configuration['mode'];
    output: string;
    standalone: string;
}

export async function buildProject(options: BuildProjectOptionsInterface) {
    const { mode, output, standalone: standaloneArg } = options;
    const isStandaloneBuild = (options as any).parent?.rawArgs?.includes('--standalone');

    const config = generateWebpackConfig(mode, output);

    if (isStandaloneBuild && standaloneArg) {
        const filename = getFileNameWithoutExtension(standaloneArg);
        const className = toPascalCase(filename);
        config.entry = standaloneArg;
        config.output!.library = className;
        config.output!.libraryTarget = 'var';
        config.output!.environment = {
            arrowFunction: false,
            module: false
        }
    } else if (isStandaloneBuild && !standaloneArg) {
    }

    console.log(config);
    const compiler = Webpack(config);

    console.log('Building project...');
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
