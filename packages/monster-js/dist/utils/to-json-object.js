export function toJsonObject(value) {
    try {
        return JSON.parse(value);
    }
    catch (error) {
        throw new Error(`Invalid value: "${value}" cannot be transformed into a json object.`);
    }
}
//# sourceMappingURL=to-json-object.js.map