"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWebpackConfig = generateWebpackConfig;
const path_1 = __importDefault(require("path"));
const get_default_webpack_config_1 = require("./get-default-webpack-config");
function generateWebpackConfig(mode, output, additionalConfig = []) {
    const defaultWebpackConfig = (0, get_default_webpack_config_1.getDefaultWebpackConfig)(additionalConfig);
    const config = {
        ...defaultWebpackConfig,
        mode,
        output: {
            ...defaultWebpackConfig.output,
            path: path_1.default.resolve(process.cwd(), output),
        },
        optimization: {
            ...defaultWebpackConfig.optimization,
            minimize: mode === 'production'
        }
    };
    return config;
}
//# sourceMappingURL=generate-webpack-config.js.map