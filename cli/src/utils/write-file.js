import { dirname } from "path";
import { directoryExists } from "./directory-exists.js";
import { mkdirSync, writeFileSync } from "fs";

export function writeFile(filePath, content = '') {
    const fileDirectory = dirname(filePath);
    
    if (!directoryExists(fileDirectory)) {
        mkdirSync(fileDirectory, { recursive: true });
    }
    
    writeFileSync(filePath, content);
}
