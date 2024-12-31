export interface WatcherInterface {
    hasChanges: boolean;
    value: any;
    evaluate(...args: any[]): any;
    getIsConnected(): boolean;
    handlerChange(newValue?: any, oldValue?: any): void;
}
