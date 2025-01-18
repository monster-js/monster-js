import { SelectorObjectInterface } from "../interfaces/selector-object.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";
import { ActionPayloadType } from "../types/action-payload.type";
import { ActionReducerType } from "../types/action-reducer.type";
import { ActionReducersType } from "../types/action-reducers.type";

export function createStore<T>(initialState: T, actionReducers: ActionReducersType<T>) {

    let state: T = Object.freeze(initialState);
    let changeDetections: WebComponentInterface[] = [];

    let subscribers: {
        stateKey: keyof T;
        value: any;
        valueCaller: () => any;
        callback: (value?: any) => any;
        isConnected: () => boolean;
    }[] = [];

    const addComponent = (component: any) => {
        if (!changeDetections.includes(component)) {
            changeDetections.push(component);
        }
    };

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
            if (changeDetection.isConnected) {
                changeDetection.detectChanges();
            }
        });
        changeDetections = changeDetections.filter((changeDetection) => changeDetection.isConnected);
        runSubscribers(stateKey);
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

    return {
        dispatch: <A extends ActionReducerType<any, any>>(action: A, payload: ActionPayloadType<A> = null) => {
            const stateKey = actionReducersStateKeyMap.get(action);
            modifyState(action(state[stateKey], payload), stateKey);
        },
        select: <TT>(fnComponent: any, selector: SelectorObjectInterface) => {
            addComponent(fnComponent);

            return {
                value: (): TT => selector.filter((state as any)[selector.stateKey]),
                subscribe: (callback: (value?: any) => any) => {
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
        get: (fnComponent: any, stateKey: keyof T) => {
            addComponent(fnComponent);

            return {
                value: () => state[stateKey],
                subscribe: (callback: (value?: any) => any) => {
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
