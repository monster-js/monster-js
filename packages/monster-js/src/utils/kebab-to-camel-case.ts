export function kebabToCamelCase(str: string) {
    return str
        .split('-') // Split the string into an array of words
        .map((word, index) =>
            index === 0
                ? word.toLowerCase() // Keep the first word lowercase
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize the rest
        )
        .join(''); // Join the array back into a string
}