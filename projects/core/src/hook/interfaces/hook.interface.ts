export interface Hook {
    isConnected(): boolean;
    hook(...args: any[]): void;
}
