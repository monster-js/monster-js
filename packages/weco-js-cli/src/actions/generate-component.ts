import * as fs from 'fs';
import * as path from 'path';
import { filenameToPascalCase } from "../utils/filename-to-pascal-case";
import { generateValidWebComponentSelector } from '../utils/generate-valid-web-component-selector';
import { getWecoConfig } from '../utils/get-weco-config';

export function generateComponent(name: string) {

    const wecoConfig = getWecoConfig();
    if (!wecoConfig) return;

    // Split the input name to get the last segment as the file name
    const nameArr = name.split('/');
    const filename = nameArr[nameArr.length - 1];

    // Convert the filename to PascalCase and append "Component"
    const filenamePascalCase = filenameToPascalCase(filename) + 'Component';

    // Generate the target file path by appending the .component.tsx extension
    const targetFilePath = path.join(process.cwd(), wecoConfig.appRoot, `${name}.component.tsx`);

    // Check if the target file already exists
    if (fs.existsSync(targetFilePath)) {
        console.log(`The file ${targetFilePath} already exists. Aborting to avoid overwriting.`);
        return;
    }

    // Ensure a valid selector for the web component
    const validSelector = generateValidWebComponentSelector(filename, wecoConfig.componentSelectorPrefix);

    // Generate the file content
    const fileContent = `import { component } from 'weco-js';

export function ${filenamePascalCase}() {
    return <h1>${filenamePascalCase}</h1>;
}

component(${filenamePascalCase}, {
    selector: '${validSelector}'
});
`;

    // Ensure the directory structure exists before writing the file
    const targetDir = path.dirname(targetFilePath);
    fs.mkdirSync(targetDir, { recursive: true });

    // Write the file to the target path
    fs.writeFileSync(targetFilePath, fileContent, 'utf8');

    console.log(`Component ${filenamePascalCase} created at ${targetFilePath}`);
}
