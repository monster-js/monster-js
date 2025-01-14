"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSharedState = generateSharedState;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const get_monster_config_1 = require("../utils/get-monster-config");
const filename_to_camel_case_1 = require("../utils/filename-to-camel-case");
const logger_1 = require("../utils/logger");
function generateSharedState(name) {
    const monsterConfig = (0, get_monster_config_1.getMonsterConfig)();
    if (!monsterConfig)
        return;
    // Split the input name to get the last segment as the file name
    const nameArr = name.split('/');
    const filename = nameArr[nameArr.length - 1];
    // Convert the filename to PascalCase and append "Component"
    const filenameCamelCase = (0, filename_to_camel_case_1.filenameToCamelCase)(filename) + 'State';
    // Generate the target file path by appending the .component.tsx extension
    const targetFilePath = path.join(process.cwd(), monsterConfig.appRoot, `${name}.state.ts`);
    // Check if the target file already exists
    if (fs.existsSync(targetFilePath)) {
        console.log('');
        (0, logger_1.failed)(`The file ${targetFilePath} already exists. Aborting to avoid overwriting.`);
        return;
    }
    // Generate the file content
    const fileContent = `import { createSharedState } from 'monster-js';

export const ${filenameCamelCase} = createSharedState(null);
`;
    // Ensure the directory structure exists before writing the file
    const targetDir = path.dirname(targetFilePath);
    fs.mkdirSync(targetDir, { recursive: true });
    // Write the file to the target path
    fs.writeFileSync(targetFilePath, fileContent, 'utf8');
    console.log('');
    (0, logger_1.success)(`Shared state ${filenameCamelCase} created at ${targetFilePath}`);
}
//# sourceMappingURL=generate-shared-state.js.map