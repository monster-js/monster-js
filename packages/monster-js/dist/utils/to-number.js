export function toNumber(value) {
    if (typeof value === "number") {
        return value; // Already a number
    }
    if (typeof value === "string") {
        const converted = Number(value.trim());
        if (!isNaN(converted)) {
            return converted;
        }
    }
    throw new Error("Invalid value: cannot be transformed into a number");
}
//# sourceMappingURL=to-number.js.map