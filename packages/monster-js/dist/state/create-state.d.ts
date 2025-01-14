type CreateStateReturnType<T> = [() => T, (value: T) => void];
export declare function createState<T>(classComponent: any, initValue: T): CreateStateReturnType<T>;
export {};
