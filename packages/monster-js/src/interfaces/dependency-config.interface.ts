export interface DependencyConfigInterface<T = any> {
    provide: any;               // The key or type to provide (e.g., a class or identifier)
    useValue?: T;               // A static value to use as the dependency
    useClass?: { new(...args: any[]): T }; // A class to instantiate in place of the provided dependency
    singleton?: boolean;        // Whether to use a singleton instance (default is true)
};
