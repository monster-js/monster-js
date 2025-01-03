export function removeStartAndEndSlashes(str: string) {
    return str.replace(/^\/+|\/+$/g, '');
}
