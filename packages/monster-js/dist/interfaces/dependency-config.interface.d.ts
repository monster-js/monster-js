export interface DependencyConfigInterface<T = any> {
    provide: any;
    useValue?: T;
    useClass?: {
        new (...args: any[]): T;
    };
    singleton?: boolean;
}
