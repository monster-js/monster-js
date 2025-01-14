export declare function createFeatureEventEmitter<T = any>(name: string): {
    on: (callback: (value: T) => void) => void;
    emit: (value: T) => void;
    off: (callback: (value: T) => void) => void;
    clear: () => void;
};
