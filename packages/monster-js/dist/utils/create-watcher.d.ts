import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";
export declare function createWatcher(instance: WebComponentInterface, initialValue: any, getIsConnected: () => boolean, valueGetter: () => any, handlerChange: (value?: any) => void): WatcherInterface;
