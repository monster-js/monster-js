type ObjectType = Record<string, string>;

export function haveSameProperties(obj1: ObjectType, obj2: ObjectType): boolean {
  const keys1 = Object.keys(obj1 || {});
  const keys2 = Object.keys(obj2 || {});

  if (keys1.length !== keys2.length) {
    return false;
  }

  return !keys1.some((key) => obj1[key] !== obj2[key]);
}
