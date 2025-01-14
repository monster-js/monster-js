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
exports.getMonsterConfig = getMonsterConfig;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const logger_1 = require("./logger");
function getMonsterConfig() {
    // Ensure the command is run at the root of a monster.js project
    const monsterJsonPath = path.join(process.cwd(), 'monster.json');
    if (!fs.existsSync(monsterJsonPath)) {
        console.log('');
        (0, logger_1.error)('This command should run at the root of a monster js project.');
        return;
    }
    // Load the monster.json file
    const monsterConfig = JSON.parse(fs.readFileSync(monsterJsonPath, 'utf8'));
    return monsterConfig;
}
//# sourceMappingURL=get-monster-config.js.map