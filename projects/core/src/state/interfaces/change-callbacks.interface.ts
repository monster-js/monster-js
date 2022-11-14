export interface ChangeCallback {
    isConnected(): boolean;
    callback(value?: any): void;
}
