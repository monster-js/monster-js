"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileNameWithoutExtension = getFileNameWithoutExtension;
const path_1 = __importDefault(require("path"));
function getFileNameWithoutExtension(filePath) {
    // Extract the base name of the file
    const baseName = path_1.default.basename(filePath);
    // Remove `.component.<ext>` if it exists
    const componentRegex = /\.component\.[^.]+$/;
    if (componentRegex.test(baseName)) {
        return baseName.replace(componentRegex, '');
    }
    // Otherwise, just remove the file extension
    return baseName.replace(path_1.default.extname(baseName), '');
}
//# sourceMappingURL=get-filename-without-extension.js.map