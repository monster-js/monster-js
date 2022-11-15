export interface DevToolChangeDetection {
    isConnected: () => boolean;
    changeDetection: () => void;
};