import * as fs from 'fs';
import * as path from 'path';
import { getWecoConfig } from '../utils/get-weco-config';
import { failed, success } from '../utils/logger';

export function generateEnvironments() {

    const wecoConfig = getWecoConfig();
    if (!wecoConfig) return;

    // Convert the filename to PascalCase and append "Component"
    const devFilename = `environment.dev.ts`;
    const prodFilename = `environment.prod.ts`;

    // Generate the target file path by appending the .component.tsx extension
    const devTargetFilePath = path.join(process.cwd(), wecoConfig.environmentsPath, devFilename);
    const prodTargetFilePath = path.join(process.cwd(), wecoConfig.environmentsPath, prodFilename);

    // Check if the target file already exists
    if (fs.existsSync(devTargetFilePath)) {
        console.log('');
        failed(`The file ${devTargetFilePath} already exists. Aborting to avoid overwriting.`);
    } else {
        // generate
        generateContent('false', devTargetFilePath, devFilename);
    }

    // Check if the target file already exists
    if (fs.existsSync(prodTargetFilePath)) {
        console.log('');
        failed(`The file ${prodTargetFilePath} already exists. Aborting to avoid overwriting.`);
    } else {
        // generate
        generateContent('true', prodTargetFilePath, prodFilename);
    }
}

function generateContent(production: 'true' | 'false', targetFilePath: string, filename: string) {

    // Generate the file content
    const fileContent = `export const environment = {
    production: ${production},
};
`;

    // Ensure the directory structure exists before writing the file
    const targetDir = path.dirname(targetFilePath);
    fs.mkdirSync(targetDir, { recursive: true });

    // Write the file to the target path
    fs.writeFileSync(targetFilePath, fileContent, 'utf8');

    console.log('');
    success(`Environment ${filename} created at ${targetFilePath}`);
}






