import fs from 'fs';
import _path from 'path';

export default function (babel: any) {
  const { types: t } = babel;
  
  return {
    name: "ast-transform", // not required
    visitor: {
      Program(path: any, state: any) {
      	path.node.body.forEach((node: any) => {
          if(
            node.type === 'ExpressionStatement'
            && node.expression.type === 'CallExpression'
            && node.expression.callee.type === 'Identifier'
            && node.expression.callee.name === 'component'
          ) {
            const componentConfig = node.expression.arguments[1];
            let isShadowDom = false;
            if (t.isObjectExpression(componentConfig)) {
              componentConfig.properties.forEach((prop: any) => {
              	if (
                  prop.key.type === 'Identifier'
                  && prop.key.name === 'shadowDom'
                  && prop.value.type === 'BooleanLiteral'
                  && prop.value.value === true
                ) {
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

                if (fs.existsSync(cssFilePath)) {
                    const data = fs.readFileSync(cssFilePath, 'utf8');
                    console.log(data);
                }

            }
          }
        });
      }
    }
  };
}
