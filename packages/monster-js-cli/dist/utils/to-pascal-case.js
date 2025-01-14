"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPascalCase = toPascalCase;
function toPascalCase(str) {
    return str
        .toLowerCase() // Convert the string to lowercase
        .replace(/(?:^|\s|_|-)(\w)/g, (_, char) => char.toUpperCase()) // Capitalize the first letter of each word
        .replace(/[\s_-]/g, ''); // Remove spaces, underscores, and hyphens
}
//# sourceMappingURL=to-pascal-case.js.map