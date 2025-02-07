export function toJsonObject<T = unknown>(value: string): T | never {
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`Invalid value: "${value}" cannot be transformed into a json object.`);
  }
}
