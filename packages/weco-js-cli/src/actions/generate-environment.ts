import * as fs from 'fs';
import * as path from 'path';
import { getWecoConfig } from '../utils/get-weco-config';
import chalk from 'chalk';

export function generateEnvironment(name: string) {

    const wecoConfig = getWecoConfig();
    if (!wecoConfig) return;

    // Split the input name to get the last segment as the file name
    const nameArr = name.split('/');
    const filename = nameArr[nameArr.length - 1].toLowerCase();

    // Generate the target file path by appending the .component.tsx extension
    const targetFilePath = path.join(process.cwd(), wecoConfig.environmentsPath, `environment.${filename}.ts`);

    // Check if the target file already exists
    if (fs.existsSync(targetFilePath)) {
        console.log('');
        console.log(`[${chalk.red('Failed')}] The file ${targetFilePath} already exists. Aborting to avoid overwriting.`);
        return;
    }

    // Generate the file content
    const fileContent = `export const environment = {
    production: false,
};
`;

    // Ensure the directory structure exists before writing the file
    const targetDir = path.dirname(targetFilePath);
    fs.mkdirSync(targetDir, { recursive: true });

    // Write the file to the target path
    fs.writeFileSync(targetFilePath, fileContent, 'utf8');

    console.log('');
    console.log(`[${chalk.green('SUCCESS')}] Environment environment.${filename}.ts created at ${targetFilePath}`);
}






