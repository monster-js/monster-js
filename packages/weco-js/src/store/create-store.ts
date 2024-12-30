import { SelectorObjectInterface } from "../interfaces/selector-object.interface";
import { ActionPayloadType } from "../types/action-payload.type";
import { ActionReducerType } from "../types/action-reducer.type";
import { ActionReducersType } from "../types/action-reducers.type";

export function createStore<T>(initialState: T, actionReducers: ActionReducersType<T>) {
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

    const modifyState = (newState: T[keyof T], stateKey: keyof T) => {
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
    }

    const actionReducersStateKeyMap = new WeakMap<any, keyof T>();

    Object.keys(actionReducers).forEach((key) => {
        Object.keys(actionReducers[key as keyof T]).forEach((key2) => {
            const fn = actionReducers[key as keyof T][key2];
            actionReducersStateKeyMap.set(fn, key as keyof T);
        });
    });

    return {
        dispatch: <A extends ActionReducerType<any, any>>(action: A, payload: ActionPayloadType<A> = null) => {
            const stateKey = actionReducersStateKeyMap.get(action);
            modifyState(action(state[stateKey], payload), stateKey);
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