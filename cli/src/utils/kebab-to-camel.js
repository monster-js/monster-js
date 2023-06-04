export function kebabToCamel(text) {
    return text.replace(/-./g, x => x[1].toUpperCase());
}