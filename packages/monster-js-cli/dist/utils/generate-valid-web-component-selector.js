"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateValidWebComponentSelector = generateValidWebComponentSelector;
// Utility function to generate a valid custom element selector
function generateValidWebComponentSelector(filename, prefix = 'app') {
    // Ensure the name is lowercase and includes a hyphen
    const baseName = filename.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    // Return the valid selector
    return `${prefix}-${baseName}`;
}
//# sourceMappingURL=generate-valid-web-component-selector.js.map