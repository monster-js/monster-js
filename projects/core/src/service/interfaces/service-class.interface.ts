export interface ServiceClass {
    new(...args: any[]): any;
    singleton?: boolean;
}