"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const fs_1 = __importDefault(require("fs"));
function default_1(babel) {
    const { types: t } = babel;
    return {
        name: "ast-transform", // not required
        visitor: {
            Program(path, state) {
                path.node.body.forEach((node) => {
                    if (node.type === 'ExpressionStatement'
                        && node.expression.type === 'CallExpression'
                        && node.expression.callee.type === 'Identifier'
                        && node.expression.callee.name === 'component') {
                        const componentConfig = node.expression.arguments[1];
                        let isShadowDom = false;
                        if (t.isObjectExpression(componentConfig)) {
                            componentConfig.properties.forEach((prop) => {
                                if (prop.key.type === 'Identifier'
                                    && prop.key.name === 'shadowDom'
                                    && prop.value.type === 'BooleanLiteral'
                                    && prop.value.value === true) {
                                    isShadowDom = true;
                                }
                            });
                        }
                        if (isShadowDom) {
                            const filePath = state.file.opts.filename || '';
                            const rootDir = state.file.opts.root || '';
                            const filename = filePath.replace(rootDir, '');
                            const fileId = path.basename(filename, path.extname(filename));
                            const cssFilePath = path.join(path.dirname(filePath), `${fileId}.scss`);
                            if (fs_1.default.existsSync(cssFilePath)) {
                                const data = fs_1.default.readFileSync(cssFilePath, 'utf8');
                                console.log(data);
                            }
                        }
                    }
                });
            }
        }
    };
}
//# sourceMappingURL=shadow-dom-css-transformer.js.map