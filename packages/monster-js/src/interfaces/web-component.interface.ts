import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
import { WatcherInterface } from "./watcher.interface";

export interface WebComponentInterface {
    isConnected: boolean;
    addWatcher: (watcher: WatcherInterface) => void;
    addForConditionWatcher: (watcher: WatcherInterface) => void;
    addIfConditionWatcher: (watcher: WatcherInterface) => void;
    detectChanges(): void;
    getDirective(namespace: string): any;
    addHook: (type: LifecycleHooksEnum, callback: (...args: any[]) => void) => void;
    addTriggerAfterConnected: (callback: (...args: any[]) => any) => void;
    removeTriggerAfterConnected: (callback: (...args: any[]) => any) => void;
}
