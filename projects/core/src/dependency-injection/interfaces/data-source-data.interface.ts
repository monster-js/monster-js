export interface DataSourceData {
    singleton?: boolean;
    instance?: any;
    config?: any;
    useValue?: { [key: string]: any; };
}