export function toJsonObject<T = any>(value: string): T {
    if (typeof value !== "string") {
        throw new Error("Json transformer input value must be a string.");
    }

    return JSON.parse(value);
}
