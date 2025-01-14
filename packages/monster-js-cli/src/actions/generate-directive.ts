import * as fs from 'fs';
import * as path from 'path';
import { filenameToPascalCase } from "../utils/filename-to-pascal-case";
import { getMonsterConfig } from '../utils/get-monster-config';
import { failed, success } from '../utils/logger';

export function generateDirective(name: string) {

    const monsterConfig = getMonsterConfig();
    if (!monsterConfig) return;

    // Split the input name to get the last segment as the file name
    const nameArr = name.split('/');
    const filename = nameArr[nameArr.length - 1];

    // Convert the filename to PascalCase and append "Component"
    const realPascalCaseFilename = filenameToPascalCase(filename);
    const filenamePascalCase = realPascalCaseFilename + 'Directive';
    const directiveName = realPascalCaseFilename.charAt(0).toLowerCase() + realPascalCaseFilename.slice(1);
    let filenameCamelCase = filenamePascalCase.charAt(0).toLowerCase() + filenamePascalCase.slice(1);

    // Generate the target file path by appending the .component.tsx extension
    const targetFilePath = path.join(process.cwd(), monsterConfig.appRoot, `${name}.directive.ts`);

    // Check if the target file already exists
    if (fs.existsSync(targetFilePath)) {
        console.log('');
        failed(`The file ${targetFilePath} already exists. Aborting to avoid overwriting.`);
        return;
    }

    // Generate the file content
    const fileContent = `import { directive, DirectiveDataType } from 'monster-js';
    
function ${filenameCamelCase}(element: Element, data: DirectiveDataType) {
    return element;
};

export default directive(${filenameCamelCase}, '${directiveName}');
`;

    // Ensure the directory structure exists before writing the file
    const targetDir = path.dirname(targetFilePath);
    fs.mkdirSync(targetDir, { recursive: true });

    // Write the file to the target path
    fs.writeFileSync(targetFilePath, fileContent, 'utf8');

    console.log('');
    success(`Directive ${filenameCamelCase} created at ${targetFilePath}`);
}





