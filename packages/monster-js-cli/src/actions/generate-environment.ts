import * as fs from 'fs';
import * as path from 'path';
import { getMonsterConfig } from '../utils/get-monster-config';
import { failed, success } from '../utils/logger';

export function generateEnvironment(name: string) {

    const monsterConfig = getMonsterConfig();
    if (!monsterConfig) return;

    // Split the input name to get the last segment as the file name
    const nameArr = name.split('/');
    const filename = nameArr[nameArr.length - 1].toLowerCase();

    // Generate the target file path by appending the .component.tsx extension
    const targetFilePath = path.join(process.cwd(), monsterConfig.environmentsPath, `environment.${filename}.ts`);

    // Check if the target file already exists
    if (fs.existsSync(targetFilePath)) {
        console.log('');
        failed(`The file ${targetFilePath} already exists. Aborting to avoid overwriting.`);
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
    success(`Environment environment.${filename}.ts created at ${targetFilePath}`);
}






