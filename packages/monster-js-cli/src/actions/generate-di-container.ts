import * as fs from 'fs';
import * as path from 'path';
import { getMonsterConfig } from '../utils/get-monster-config';
import { filenameToCamelCase } from '../utils/filename-to-camel-case';
import { failed, success } from '../utils/logger';

export function generateDiContainer(name: string) {

    const wecoConfig = getMonsterConfig();
    if (!wecoConfig) return;

    // Split the input name to get the last segment as the file name
    const nameArr = name.split('/');
    const filename = nameArr[nameArr.length - 1];

    // Convert the filename to PascalCase and append "Component"
    const filenameCamelCase = filenameToCamelCase(filename) + 'Container';

    // Generate the target file path by appending the .component.tsx extension
    const targetFilePath = path.join(process.cwd(), wecoConfig.appRoot, `${name}.container.ts`);

    // Check if the target file already exists
    if (fs.existsSync(targetFilePath)) {
        console.log('');
        failed(`The file ${targetFilePath} already exists. Aborting to avoid overwriting.`);
        return;
    }

    // Generate the file content
    const fileContent = `import { createDIContainer } from 'weco-js';

export const [${filenameCamelCase}, ${filenameCamelCase}Override] = createDIContainer();
`;

    // Ensure the directory structure exists before writing the file
    const targetDir = path.dirname(targetFilePath);
    fs.mkdirSync(targetDir, { recursive: true });

    // Write the file to the target path
    fs.writeFileSync(targetFilePath, fileContent, 'utf8');

    console.log('');
    success(`DI container ${filenameCamelCase} created at ${targetFilePath}`);
}






