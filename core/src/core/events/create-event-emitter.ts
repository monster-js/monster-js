import { FunctionComponent } from '../component/interfaces/function-component.interface';

interface SharedEventWatcher {
    isConnected: () => boolean;
    callback: (value?: any) => void;
}

interface SharedEvent {
    watchers: SharedEventWatcher[];
}

type ReturnType<T> = {
    dispatch: (value?: T) => void,
    subscribe: (callback: (value?: T) => void) => void
};

export function createEventEmitter<T>() {
    const sharedEvent: SharedEvent = {
        watchers: []
    };

    return function(context: FunctionComponent): ReturnType<T> {
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

        return {
            dispatch: trigger,
            subscribe: subscriber
        };
    };
}
