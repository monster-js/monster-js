const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const visitor = require('./jsx-visitor');
const { generateElementKey } = require("./utils/generate-element-key");

module.exports = function (source) {
    const ast = parser.parse(source, {
        sourceType: 'module',
        plugins: ['jsx']
    });

    const filePath = this.resourcePath.replace(process.cwd(), '');
    const elKey = generateElementKey(filePath);

    traverse(ast, visitor({}, elKey).visitor);

    return generate(ast, { sourceMap: true }, source).code;
}
