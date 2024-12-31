export interface WatcherInterface {
    hasChanges: boolean;
    value: any;
    evaluate(...args: any[]): void;
    getIsConnected(): boolean;
    handlerChange(newValue?: any, oldValue?: any): void;
}
