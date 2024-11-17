import { WatcherInterface } from "./watcher.interface";

export interface WebComponentInterface {
    isConnected: boolean;
    addWatcher: (watcher: WatcherInterface) => void;
    addConditionWatcher: (watcher: WatcherInterface) => void;
    detectChanges(): void;
    addHook: (type: 'connected' | 'disconnected' | 'attributeChanged' | 'adopted' | 'afterViewInit', callback: (...args: any[]) => void) => void;
    props: Record<any, any>;
}
