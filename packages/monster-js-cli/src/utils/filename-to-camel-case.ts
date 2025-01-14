export function filenameToCamelCase(fileName: string): string {
    // Remove file extension if present
    const baseName = fileName.includes('.') ? fileName.substring(0, fileName.lastIndexOf('.')) : fileName;

    // Split the name by non-alphanumeric characters, capitalize each part except the first one, and join them
    return baseName
        .split(/[^a-zA-Z0-9]+/)
        .map((word, index) =>
            index === 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join('');
}
