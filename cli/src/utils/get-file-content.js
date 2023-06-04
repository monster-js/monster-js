import { readFileSync } from "fs";

export function getFileContent(filePath) {
    return readFileSync(filePath, 'utf-8');
}