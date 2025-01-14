"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const postcss_1 = __importDefault(require("postcss"));
const postcss_selector_parser_1 = __importDefault(require("postcss-selector-parser"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function generateShortUniqueId() {
    return Math.random().toString(36).substr(2, 8); // Convert to base-36 and take 8 characters
}
function default_1(source) {
    const filePath = this.resourcePath; // Full path of the file being processed
    const rootDirectory = this.rootContext || this.context; // Root directory of the project
    let result = source;
    const processCss = (css, uniqueId) => {
        return (0, postcss_1.default)([
            (root) => {
                root.walkRules((rule) => {
                    rule.selectors = rule.selectors.map((selector) => {
                        return (0, postcss_selector_parser_1.default)()
                            .processSync(selector, {
                            updateSelector: true,
                            lossless: false,
                        })
                            .split(',')
                            .map((sel) => `${sel}[${uniqueId}]`)
                            .join(', ');
                    });
                });
            },
        ]).process(css).css;
    };
    const filename = filePath.replace(rootDirectory, '');
    const fileId = path_1.default.basename(filename, path_1.default.extname(filename));
    if (!global.__GLOBAL_WECO_ELEMENT_IDS[fileId]) {
        global.__GLOBAL_WECO_ELEMENT_IDS[fileId] = 'w' + generateShortUniqueId() + global.__GLOBAL_WECO_ELEMENT_ID_COUNTER;
        global.__GLOBAL_WECO_ELEMENT_ID_COUNTER++;
    }
    const componentFilePath = path_1.default.join(path_1.default.dirname(filePath), `${fileId}.tsx`);
    if (fs_1.default.existsSync(componentFilePath)) {
        result = processCss(source, global.__GLOBAL_WECO_ELEMENT_IDS[fileId]);
    }
    return result;
}
;
//# sourceMappingURL=css-transformer.js.map