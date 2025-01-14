import postcss from "postcss";
import parser from "postcss-selector-parser";
import path from 'path';
import fs from 'fs';

declare const global: any;

function generateShortUniqueId() {
  return Math.random().toString(36).substr(2, 8); // Convert to base-36 and take 8 characters
}

export default function (this: any, source: any) {
  const filePath = this.resourcePath; // Full path of the file being processed
  const rootDirectory = this.rootContext || this.context; // Root directory of the project
  let result = source;

  const processCss = (css: any, uniqueId: string) => {
    return postcss([
      (root: any) => {
        root.walkRules((rule: any) => {
          rule.selectors = rule.selectors.map((selector: any) => {
            return parser()
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
  const fileId = path.basename(filename, path.extname(filename));

  if (!global.__GLOBAL_WECO_ELEMENT_IDS[fileId]) {
    global.__GLOBAL_WECO_ELEMENT_IDS[fileId] = 'w' + generateShortUniqueId() + global.__GLOBAL_WECO_ELEMENT_ID_COUNTER;
    global.__GLOBAL_WECO_ELEMENT_ID_COUNTER++;
  }

  const componentFilePath = path.join(path.dirname(filePath), `${fileId}.tsx`);
  if (fs.existsSync(componentFilePath)) {
    result = processCss(source, global.__GLOBAL_WECO_ELEMENT_IDS[fileId]);
  }

  return result;
};
