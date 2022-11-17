export interface ProviderClass {
    new(...args: any[]): any;
    singleton?: boolean;
}