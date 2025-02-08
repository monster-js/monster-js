import { WatcherInterface } from '../interfaces/watcher.interface';
import { WebComponentInterface } from '../interfaces/web-component.interface';
export declare function createWatcher(instance: WebComponentInterface, initialValue: unknown, getIsConnected: () => boolean, valueGetter: () => unknown, handlerChange: (value?: unknown) => void): WatcherInterface;
