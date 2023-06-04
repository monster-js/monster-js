export interface ProviderClass<T = any> {
    new(...args: any[]): T;
    singleton?: boolean;
}