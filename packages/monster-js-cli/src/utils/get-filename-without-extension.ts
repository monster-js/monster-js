import path from 'path';

export function getFileNameWithoutExtension(filePath: string) {
    // Extract the base name of the file
    const baseName = path.basename(filePath);
    
    // Remove `.component.<ext>` if it exists
    const componentRegex = /\.component\.[^.]+$/;
    if (componentRegex.test(baseName)) {
        return baseName.replace(componentRegex, '');
    }
    
    // Otherwise, just remove the file extension
    return baseName.replace(path.extname(baseName), '');
}
