import { SelectorObjectInterface } from "../interfaces/selector-object.interface";
import { ActionPayloadType } from "../types/action-payload.type";
import { ActionReducerType } from "../types/action-reducer.type";
import { ActionReducersType } from "../types/action-reducers.type";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any;
    }
}

export function createStore<T>(initialState: T, actionReducers: ActionReducersType<T>, connectDevTools: boolean = false) {

    let state: T = Object.freeze(initialState);
    let changeDetections: { isConnected: () => boolean; detectChanges: () => any; }[] = [];

    let subscribers: {
        stateKey: keyof T;
        value: any;
        valueCaller: () => any;
        callback: (value?: any) => any;
        isConnected: () => boolean;
    }[] = [];

    const runSubscribers = (stateKey: keyof T) => {
        subscribers.forEach((subscriber) => {
            if (subscriber.stateKey === stateKey && subscriber.isConnected()) {
                const newValue = subscriber.valueCaller();
                if (subscriber.value !== newValue) {
                    subscriber.value = newValue;
                    subscriber.callback(newValue);
                }
            }
        });
        subscribers = subscribers.filter((subscriber) => subscriber.isConnected());
    }

    const modifyState = (newState: T[keyof T], stateKey: keyof T, actionName: string) => {
        state = Object.freeze({
            ...state,
            [stateKey]: newState
        });

        changeDetections.forEach((changeDetection) => {
            if (changeDetection.isConnected()) {
                changeDetection.detectChanges();
            }
        });
        changeDetections = changeDetections.filter((changeDetection) => changeDetection.isConnected());
        runSubscribers(stateKey);

        // Notify DevTools of state changes
        if (connectDevTools && devtools) {
            devtools.send({ type: `[${String(stateKey)}] ${actionName}` }, state);
        }
    }

    const actionReducersStateKeyMap = new WeakMap<any, keyof T>();
    const actionReducersNameMap = new WeakMap<any, string>();

    Object.keys(actionReducers).forEach((key) => {
        Object.keys(actionReducers[key as keyof T]).forEach((key2) => {
            const fn = actionReducers[key as keyof T][key2];
            actionReducersStateKeyMap.set(fn, key as keyof T);
            actionReducersNameMap.set(fn, key2);
        });
    });

    // Redux DevTools setup
    const devtools =
        connectDevTools && (window as any).__REDUX_DEVTOOLS_EXTENSION__
            ? (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect()
            : null;

    if (devtools) {
        devtools.init(initialState);
    }

    return {
        dispatch: <A extends ActionReducerType<any, any>>(action: A, payload: ActionPayloadType<A> = null) => {
            const stateKey = actionReducersStateKeyMap.get(action);
            const actionName = actionReducersNameMap.get(action);
            modifyState(action(state[stateKey], payload), stateKey, actionName);
        },
        select: <TT>(selector: SelectorObjectInterface) => {
            return {
                value: (): TT => selector.filter((state as any)[selector.stateKey]),
                subscribe: (fnComponent: any, callback: (value?: any) => any) => {
                    const subscriber = {
                        stateKey: selector.stateKey,
                        value: selector.filter((state as any)[selector.stateKey]),
                        valueCaller: () => selector.filter((state as any)[selector.stateKey]),
                        callback: callback,
                        isConnected: () => fnComponent.isConnected
                    };

                    subscribers.push(subscriber);
                    callback(subscriber.value);
                }
            };
        },
        get: (stateKey: keyof T) => {
            return {
                value: () => state[stateKey],
                subscribe: (fnComponent: any, callback: (value?: any) => any) => {
                    const subscriber = {
                        stateKey,
                        value: state[stateKey],
                        valueCaller: () => state[stateKey],
                        callback: callback,
                        isConnected: () => fnComponent.isConnected
                    };

                    subscribers.push(subscriber);
                    callback(subscriber.value);
                }
            };
        },
    };
}
