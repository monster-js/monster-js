import { FunctionComponent } from '../component/interfaces/function-component.interface';

interface SharedEventWatcher {
    isConnected: () => boolean;
    callback: (value?: any) => void;
}

interface SharedEvent {
    watchers: SharedEventWatcher[];
}

type ReturnType<T> = [(value?: T) => void, (callback: (value?: T) => void) => void];

export function createSharedEvent() {
    const sharedEvent: SharedEvent = {
        watchers: []
    };

    return function<T>(context: FunctionComponent): ReturnType<T> {
        const trigger = (value?: T) => {
            sharedEvent.watchers.forEach(watcher => {
                if (watcher.isConnected()) {
                    watcher.callback(value);
                }
            });
            sharedEvent.watchers = sharedEvent.watchers.filter(watcher => watcher.isConnected());
        }
        const subscriber = (callback: (value?: T) => void) => {
            const watcher: SharedEventWatcher = {
                isConnected: () => context.__wrapper.isConnected,
                callback
            };
            sharedEvent.watchers.push(watcher);
        }

        return [trigger, subscriber];
    };
}
