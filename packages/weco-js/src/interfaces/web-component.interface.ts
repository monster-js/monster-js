import { WatcherInterface } from "./watcher.interface";

export interface WebComponentInterface {
    addWatcher: (watcher: WatcherInterface) => void;
    addConditionWatcher: (watcher: WatcherInterface) => void;
    detectChanges(): void;
    props: Record<any, any>;
}
