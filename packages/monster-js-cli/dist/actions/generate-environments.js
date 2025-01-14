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
exports.generateEnvironments = generateEnvironments;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const get_monster_config_1 = require("../utils/get-monster-config");
const logger_1 = require("../utils/logger");
function generateEnvironments() {
    const wecoConfig = (0, get_monster_config_1.getMonsterConfig)();
    if (!wecoConfig)
        return;
    // Convert the filename to PascalCase and append "Component"
    const devFilename = `environment.dev.ts`;
    const prodFilename = `environment.prod.ts`;
    // Generate the target file path by appending the .component.tsx extension
    const devTargetFilePath = path.join(process.cwd(), wecoConfig.environmentsPath, devFilename);
    const prodTargetFilePath = path.join(process.cwd(), wecoConfig.environmentsPath, prodFilename);
    // Check if the target file already exists
    if (fs.existsSync(devTargetFilePath)) {
        console.log('');
        (0, logger_1.failed)(`The file ${devTargetFilePath} already exists. Aborting to avoid overwriting.`);
    }
    else {
        // generate
        generateContent('false', devTargetFilePath, devFilename);
    }
    // Check if the target file already exists
    if (fs.existsSync(prodTargetFilePath)) {
        console.log('');
        (0, logger_1.failed)(`The file ${prodTargetFilePath} already exists. Aborting to avoid overwriting.`);
    }
    else {
        // generate
        generateContent('true', prodTargetFilePath, prodFilename);
    }
}
function generateContent(production, targetFilePath, filename) {
    // Generate the file content
    const fileContent = `export const environment = {
    production: ${production},
};
`;
    // Ensure the directory structure exists before writing the file
    const targetDir = path.dirname(targetFilePath);
    fs.mkdirSync(targetDir, { recursive: true });
    // Write the file to the target path
    fs.writeFileSync(targetFilePath, fileContent, 'utf8');
    console.log('');
    (0, logger_1.success)(`Environment ${filename} created at ${targetFilePath}`);
}
//# sourceMappingURL=generate-environments.js.map