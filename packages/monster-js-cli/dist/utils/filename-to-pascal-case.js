"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filenameToPascalCase = filenameToPascalCase;
function filenameToPascalCase(fileName) {
    // Remove file extension if present
    const baseName = fileName.includes('.') ? fileName.substring(0, fileName.lastIndexOf('.')) : fileName;
    // Split the name by non-alphanumeric characters, capitalize each part, and join them
    return baseName
        .split(/[^a-zA-Z0-9]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}
//# sourceMappingURL=filename-to-pascal-case.js.map