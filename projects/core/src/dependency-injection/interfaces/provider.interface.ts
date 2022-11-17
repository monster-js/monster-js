export interface Provider<T = { new(...args: any[]): any; }> {
    provide: T;
    useValue?: any;
    useClass?: { new(...args: any[]): any; };
}
