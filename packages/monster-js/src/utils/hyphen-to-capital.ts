export function hyphenToCapital(str: string) {
    return str
        .split('-') // Split the string into an array of words
        .map((word, index) =>
            index === 0
                ? word
                : word.charAt(0).toUpperCase() + word.slice(1) // Capitalize the rest
        )
        .join(''); // Join the array back into a string
}