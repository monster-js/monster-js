import { FunctionComponent, createStoreState, UseStateReturn } from "@monster-js/core";

export const createStore = <T>(store: T): <K extends keyof T>(context: FunctionComponent, key: K, callback?: (value?: T[K]) => void) => UseStateReturn<T[K]> => {
    let sharedStates: any = {};
    Object.keys(store as any).forEach(key => sharedStates[key] = createStoreState(key, (store as any)[key]));
    return <K extends keyof T>(context: FunctionComponent, key: K, callback?: (value?: T[K]) => void): UseStateReturn<T[K]> => sharedStates[key](context, callback);
}
