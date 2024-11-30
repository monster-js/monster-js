export function booleanTransformer(value: any): boolean {
    return !(value === undefined || value === null || value === false || value === "false");
}
