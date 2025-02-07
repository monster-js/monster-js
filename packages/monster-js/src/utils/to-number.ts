export function toNumber(value: string): number | never {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const converted = Number(value.trim());
    if (!Number.isNaN(converted)) {
      return converted;
    }
  }
  throw new Error(`Invalid value: "${value}" cannot be transformed into a number.`);
}
