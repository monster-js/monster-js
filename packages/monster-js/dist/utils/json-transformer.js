export function jsonTransformer(value) {
    if (typeof value !== "string") {
        throw new Error("Json transformer input value must be a string.");
    }
    return JSON.parse(value);
}
//# sourceMappingURL=json-transformer.js.map