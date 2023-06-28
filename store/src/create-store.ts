import { FunctionComponent } from "@monster-js/core";
import { DevTool } from "./dev-tool";

interface LocalState<T> {
    state: T;
}

export interface DevToolChangeDetection {
    isConnected: () => boolean;
    changeDetection: () => void;
};

export interface ChangeCallback {
    isConnected(): boolean;
    callback(value?: any): void;
}

export const runChangeCallbacks = (callbacks: ChangeCallback[], value: any): ChangeCallback[] => {
    callbacks = callbacks.filter(item => item.isConnected());
    callbacks.forEach(item => item.callback(value));
    return callbacks;
}

export function runChangeDetections(changeDetections: DevToolChangeDetection[]): DevToolChangeDetection[] {
    changeDetections = [...new Set(changeDetections)].filter(item => item.isConnected());
    changeDetections.forEach(item => item.changeDetection());
    return changeDetections;
}

const deepFreeze = (obj: any) => {
    if (typeof obj !== 'object' || obj === null || Object.isFrozen(obj)) {
        return obj;
    }

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
        obj[key] = deepFreeze(obj[key]);
        }
    }

    return Object.freeze(obj);
};

const deepCopy = (source: any) => {
    if (typeof source !== 'object' || source === null) {
        return source;
    }

    const copy: any = Array.isArray(source) ? [] : {};
    for (const key in source) {
        if (Object.hasOwnProperty.call(source, key)) {
            copy[key] = deepCopy(source[key]);
        }
    }

    return copy;
};

export type StoreFn<T> = <K extends keyof T>(context: FunctionComponent | null, key: K, callback?: (value?: T[K]) => void) => [
    () => T[K],
    (value: T[K], devToolMessage?: string) => void
];

export const configureStore = function<T = any>(initialState: T): StoreFn<T> {

    const devTool = new DevTool();
    let changeDetections: { [key: string]: DevToolChangeDetection[] } = {};
    let changeCallbacks: { [key: string]: ChangeCallback[] } = {};
    const localState: LocalState<T> = {
        state: { ...initialState }
    };

    for (const key in initialState) {
        changeDetections[key] = [];
        changeCallbacks[key] = [];
    }

    devTool.setup(() => {
        devTool.subscribe(message => {
            if (message.type === 'DISPATCH' && message.state) {
                const newSate: T = JSON.parse(message.state);

                for (const key in newSate) localState.state[key] = newSate[key];

                for (const key in newSate) {
                    changeDetections[key] = runChangeDetections(changeDetections[key]);
                }
            }
        });
        devTool.init(localState.state as any);
    });

    devTool.send(`Init store`, localState.state as any);



    return function<K extends keyof T>(
        context: FunctionComponent | null,
        key: K,
        callback?: (value?: T[K]) => void
    ): [
        () => T[K],
        (value: T[K], devToolMessage?: string) => void
    ] {
        const getter = () => deepFreeze(localState.state[key]);
        const setter = (value: T[K], devToolMessage?: string) => {
            if (value !== localState.state[key]) {
                localState.state[key] = value;

                changeCallbacks[key as any] = runChangeCallbacks(changeCallbacks[key as any], value);
                changeDetections[key as any] = runChangeDetections(changeDetections[key as any]);
                const devTooDefaultMessage = `[${key.toString()}] : set value`;
                const finalDevToolMessage = !devTooDefaultMessage ? devTooDefaultMessage : `[${key.toString()}] : ${devToolMessage}`;
                devTool.send(finalDevToolMessage, localState.state as any);
            }
        };

        if (context) {
            changeDetections[key as any].push({
                isConnected: () => context.__wrapper.isConnected,
                changeDetection: () => context.__wrapper.detectChanges()
            });

            if (callback) changeCallbacks[key as any].push({
                isConnected: () => context?.__wrapper?.isConnected,
                callback
            });
        }

        return [getter, setter];
    }
}
