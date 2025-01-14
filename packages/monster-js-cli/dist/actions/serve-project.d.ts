import Webpack from 'webpack';
interface ServeProjectOptionsInterface {
    port: number;
    mode: Webpack.Configuration['mode'];
}
export declare function serveProject(options: ServeProjectOptionsInterface): Promise<void>;
export {};
