export function toBoolean(value: any): boolean {
    return !(value === undefined || value === null || value === false || value === "false");
}
