export function toJsonObject(value) {
    if (typeof value !== "string") {
        throw new Error("Json transformer input value must be a string.");
    }
    return JSON.parse(value);
}
//# sourceMappingURL=to-json-object.js.map