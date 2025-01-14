export function toPascalCase(str: string) {
    return str
        .toLowerCase() // Convert the string to lowercase
        .replace(/(?:^|\s|_|-)(\w)/g, (_, char) => char.toUpperCase()) // Capitalize the first letter of each word
        .replace(/[\s_-]/g, ''); // Remove spaces, underscores, and hyphens
}
