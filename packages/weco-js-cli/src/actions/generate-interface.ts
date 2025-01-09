import * as fs from 'fs';
import * as path from 'path';
import { filenameToPascalCase } from "../utils/filename-to-pascal-case";
import { getWecoConfig } from '../utils/get-weco-config';
import chalk from 'chalk';

export function generateInterface(name: string) {

    const wecoConfig = getWecoConfig();
    if (!wecoConfig) return;

    // Split the input name to get the last segment as the file name
    const nameArr = name.split('/');
    const filename = nameArr[nameArr.length - 1];

    // Convert the filename to PascalCase and append "Component"
    const filenamePascalCase = filenameToPascalCase(filename) + 'Interface';

    // Generate the target file path by appending the .component.tsx extension
    const targetFilePath = path.join(process.cwd(), wecoConfig.appRoot, `${name}.interface.ts`);

    // Check if the target file already exists
    if (fs.existsSync(targetFilePath)) {
        console.log('');
        console.log(`[${chalk.red('Failed')}] The file ${targetFilePath} already exists. Aborting to avoid overwriting.`);
        return;
    }

    // Generate the file content
    const fileContent = `export interface ${filenamePascalCase} {
}
`;

    // Ensure the directory structure exists before writing the file
    const targetDir = path.dirname(targetFilePath);
    fs.mkdirSync(targetDir, { recursive: true });

    // Write the file to the target path
    fs.writeFileSync(targetFilePath, fileContent, 'utf8');

    console.log('');
    console.log(`[${chalk.green('SUCCESS')}] Interface ${filenamePascalCase} created at ${targetFilePath}`);
}

