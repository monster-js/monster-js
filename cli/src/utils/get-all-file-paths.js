import { readdirSync, statSync } from "fs";
import { join } from "path";

export function getAllFilePaths(directory) {
    let files = [];

    readdirSync(directory).forEach(file => {
        const absoluteFilePath = join(directory, file);

        if (statSync(absoluteFilePath).isDirectory()) {
            const allSubFiles = getAllFilePaths(absoluteFilePath);
            files.push(...allSubFiles);
        } else files.push(absoluteFilePath);
    });

    return files;
}