export interface DataSourceData {
    singleton?: boolean;
    instance?: any;
    useValue?: any;
    useClass?: { new(...args: any[]): any; };
}