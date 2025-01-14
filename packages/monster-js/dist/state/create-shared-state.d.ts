export declare function createSharedState<T>(initValue: T): (componentInstance: any) => [() => T, (value: T) => void];
