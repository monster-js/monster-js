"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveProject = serveProject;
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const generate_webpack_config_1 = require("../webpack-files/generate-webpack-config");
const get_monster_config_1 = require("../utils/get-monster-config");
const logger_1 = require("../utils/logger");
const path = require('path');
const devServerConfig = {
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
async function serveProject(options) {
    const monsterConfig = (0, get_monster_config_1.getMonsterConfig)();
    if (!monsterConfig)
        return;
    const { port, mode } = options;
    const config = (0, generate_webpack_config_1.generateWebpackConfig)(options.mode, 'dist');
    config.mode = mode;
    devServerConfig.port = port;
    const compiler = (0, webpack_1.default)(config);
    const server = new webpack_dev_server_1.default(devServerConfig, compiler);
    (0, logger_1.info)('Starting server...');
    await server.start();
}
;
//# sourceMappingURL=serve-project.js.map