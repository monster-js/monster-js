export function hyphenToCapital(inputString) {
    const capitalizeExceptFirst = (word, index) => {
        if (index === 0)
            return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
    };
    return inputString
        .split('-')
        .map(capitalizeExceptFirst)
        .join('');
}
//# sourceMappingURL=hyphen-to-capital.js.map