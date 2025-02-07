export function toBoolean(value: unknown): boolean {
  return value !== undefined
    && value !== null
    && value !== ''
    && value !== false
    && value !== 'false';
}
