export interface WatcherInterface {
    hasChanges: boolean;
    value: any;
    evaluate(): void;
    getIsConnected(): boolean;
    handlerChange(newValue?: any, oldValue?: any): void;
}
