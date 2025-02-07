export function removeStartAndEndSlashes(str: string): string {
  return str ? str.replace(/^\/+|\/+$/g, '') : '';
}
