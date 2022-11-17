import CopyWebpackPlugin from 'copy-webpack-plugin';
const path = require('path');

interface WebpackConfigArgsInterface {
    output?: string;
}

const DEFAULT_OUTPUT = 'dist';

export const WebpackConfig = (env: any, args: WebpackConfigArgsInterface = {}) => {


    let environment: string = "src/environments/environment.ts";
    if (env.environment) environment = `src/environments/environment.${env.environment}.ts`;


    return {
        mode: env.mode, // development | production | none | defaults to development
        entry: {
            index: './src/index.ts',
            polyfill: './src/polyfill.ts'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(process.cwd(), args.output || DEFAULT_OUTPUT),
            clean: true
        },
        optimization: {
            usedExports: true,
        },
        devServer: {
            static: './src',
            host: 'localhost',
            historyApiFallback: {
                index: 'index.html'
            }
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: "src/index.html", to: "" },
                    { from: "src/assets", to: "assets" }
                ],
            })
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: require.resolve('style-loader'),
                            options: {
                                injectType: "lazyStyleTag",
                                insert: function (element: HTMLElement, options: any) {
                                    const parent = options.target || document.head;
                                    parent.appendChild(element);
                                },
                            },
                        },
                        require.resolve('css-loader'),
                        require.resolve('@monster-js/transformer/css'),
                        require.resolve('sass-loader'),
                    ],
                    include: [path.resolve(process.cwd(), 'src')],
                    exclude: [path.resolve(process.cwd(), 'src/assets')]
                },
                {
                    test: /\.tsx$/,
                    use: require.resolve("@monster-js/transformer")
                },
                {
                    test: /\.tsx?$/,
                    use: require.resolve("ts-loader"),
                    exclude: /node_modules/,
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|jpeg|ico)$/i,
                    type: 'asset',
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                [path.resolve('src/environments/environment')]: path.resolve(environment)
            }
        },
        devtool: 'source-map'
    }
};
