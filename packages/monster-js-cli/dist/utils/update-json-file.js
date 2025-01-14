"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJsonFile = updateJsonFile;
const fs_1 = __importDefault(require("fs"));
function updateJsonFile(filePath, updateCallback) {
    try {
        // Read the JSON file
        const data = fs_1.default.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        // Update the JSON data using the callback
        const updatedData = updateCallback(jsonData);
        // Write the updated JSON data back to the file
        fs_1.default.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
    }
    catch (error) {
        console.error('Error updating JSON file:', error);
        throw error;
    }
}
//# sourceMappingURL=update-json-file.js.map