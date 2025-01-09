import * as fs from 'fs';
import * as path from 'path';
import { getWecoConfig } from '../utils/get-weco-config';
import { filenameToCamelCase } from '../utils/filename-to-camel-case';
import chalk from 'chalk';

export function generateEventEmitter(name: string) {

    const wecoConfig = getWecoConfig();
    if (!wecoConfig) return;

    // Split the input name to get the last segment as the file name
    const nameArr = name.split('/');
    const filename = nameArr[nameArr.length - 1];

    // Convert the filename to PascalCase and append "Component"
    const filenameCamelCase = filenameToCamelCase(filename) + 'Event';

    // Generate the target file path by appending the .component.tsx extension
    const targetFilePath = path.join(process.cwd(), wecoConfig.appRoot, `${name}.event.ts`);

    // Check if the target file already exists
    if (fs.existsSync(targetFilePath)) {
        console.log('');
        console.log(`[${chalk.red('Failed')}] The file ${targetFilePath} already exists. Aborting to avoid overwriting.`);
        return;
    }

    // Generate the file content
    const fileContent = `import { createEventEmitter } from 'weco-js';

export const ${filenameCamelCase} = createEventEmitter();
`;

    // Ensure the directory structure exists before writing the file
    const targetDir = path.dirname(targetFilePath);
    fs.mkdirSync(targetDir, { recursive: true });

    // Write the file to the target path
    fs.writeFileSync(targetFilePath, fileContent, 'utf8');

    console.log('');
    console.log(`[${chalk.green('SUCCESS')}] Event emitter ${filenameCamelCase} created at ${targetFilePath}`);
}





