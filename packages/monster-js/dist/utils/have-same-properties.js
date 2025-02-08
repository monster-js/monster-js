export function haveSameProperties(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    return !keys1.some((key) => obj1[key] !== obj2[key]);
}
//# sourceMappingURL=have-same-properties.js.map