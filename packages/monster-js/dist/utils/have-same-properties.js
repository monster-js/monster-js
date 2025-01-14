export function haveSameProperties(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    // Compare lengths first
    if (keys1.length !== keys2.length) {
        return false;
    }
    let same = true;
    keys1.forEach((key) => {
        if (obj1[key] !== obj2[key])
            same = false;
    });
    return same;
}
//# sourceMappingURL=have-same-properties.js.map