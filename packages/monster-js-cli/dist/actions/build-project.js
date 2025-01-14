"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProject = buildProject;
const webpack_1 = __importDefault(require("webpack"));
const generate_webpack_config_1 = require("../webpack-files/generate-webpack-config");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const get_filename_without_extension_1 = require("../utils/get-filename-without-extension");
const to_pascal_case_1 = require("../utils/to-pascal-case");
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const get_monster_config_1 = require("../utils/get-monster-config");
const logger_1 = require("../utils/logger");
async function buildProject(options) {
    const monsterConfig = (0, get_monster_config_1.getMonsterConfig)();
    if (!monsterConfig)
        return;
    const { mode, output, standalone } = options;
    (0, logger_1.info)('Building project...');
    if (standalone) {
        const standaloneDir = path_1.default.join(process.cwd(), monsterConfig.standaloneDir);
        fs_1.default.readdir(standaloneDir, (err, files) => {
            if (err) {
                return (0, logger_1.error)('Unable to read standalone directory');
            }
            const config = (0, generate_webpack_config_1.generateWebpackConfig)(mode, output);
            const outputPath = config.output.path + '/standalone';
            files.forEach((filePath) => {
                const filename = (0, get_filename_without_extension_1.getFileNameWithoutExtension)(filePath);
                const className = (0, to_pascal_case_1.toPascalCase)(filename);
                config.entry = `./${monsterConfig.standaloneDir}/${filePath}`;
                config.output.library = {
                    export: 'default',
                    name: className,
                    type: 'var',
                };
                config.output.filename = filename + '.js';
                config.output.libraryTarget = 'var';
                config.output.environment = {
                    arrowFunction: false,
                    module: false
                };
                config.output.path = outputPath;
                runBuild(config);
            });
        });
    }
    else {
        const config = (0, generate_webpack_config_1.generateWebpackConfig)(mode, output, [
            new copy_webpack_plugin_1.default({
                patterns: [
                    { from: path_1.default.resolve(process.cwd(), 'index.html'), to: '' }, // Copy index.html to the root of dist
                ],
            }),
        ]);
        config.output.path += '/app';
        config.stats = {
            assets: true, // Include information about assets
            assetsSort: 'size', // Sort assets by size
            modules: false, // Hide module details (optional)
            colors: true, // Add colors to the output
            entrypoints: false, // Hide entry point details (optional)
        };
        runBuild(config);
    }
}
function runBuild(config) {
    const compiler = (0, webpack_1.default)(config);
    compiler.run((err, stats) => {
        if (err) {
            console.error(err);
        }
        else if (stats?.hasErrors()) {
            (0, logger_1.error)(stats.toString('errors-only'));
        }
        else {
            console.log('');
            console.log(stats?.toString({
                assets: true,
                colors: true,
                modules: false,
                entrypoints: false,
            }));
            console.log('');
            (0, logger_1.success)('Build completed successfully.');
        }
    });
}
//# sourceMappingURL=build-project.js.map