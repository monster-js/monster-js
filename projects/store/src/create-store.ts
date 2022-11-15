import { ComponentInstance, createSharedState, UseStateReturn } from "@monster-js/core";

export const createStore = <T>(store: T): <K extends keyof T>(context: ComponentInstance, key: K, callback?: (value?: T[K]) => void) => UseStateReturn<T[K]> => {
    let sharedStates: any = {};
    Object.keys(store).forEach(key => sharedStates[key] = createSharedState(key, store[key]));
    return <K extends keyof T>(context: ComponentInstance, key: K, callback?: (value?: T[K]) => void): UseStateReturn<T[K]> => sharedStates[key](context, callback);
}
