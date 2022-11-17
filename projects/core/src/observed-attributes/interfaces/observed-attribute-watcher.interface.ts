export interface ObservedAttributeWatcher {
    [key: string]: {
        watchers: ((newValue: any, oldValue: any) => void)[];
        value: any;
    };
}
