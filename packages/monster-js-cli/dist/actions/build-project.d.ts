import Webpack from 'webpack';
export interface BuildProjectOptionsInterface {
    mode: Webpack.Configuration['mode'];
    output: string;
    standalone: boolean;
}
export declare function buildProject(options: BuildProjectOptionsInterface): Promise<void>;
