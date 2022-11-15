import { ComponentInstance, UseStateReturn } from "@monster-js/core";

function createAction<S, P = any>(
    reducer: <T extends keyof S>(state: any, payload?: P) => S[T],
    key: keyof S,
    message: string,
    store: <K extends keyof S>(context: ComponentInstance, key: K) => UseStateReturn<S[K]>
) {
    return function(context: ComponentInstance, payload?: P) {
        const [getter, setter] = store(context, key);
        const reducerValue = reducer(getter(), payload);
        setter(reducerValue, `[${key as string}] ${message}`)
    }
}

export function actionCreator<S = any>(
    store: <K extends keyof S>(context: ComponentInstance, key: K) => UseStateReturn<S[K]>,
    key: keyof S
) {

    return function<SS = any, P = any>(reducer: (state: SS, payload?: P) => SS, message: string) {
        return createAction<S, P>(reducer as any, key, message, store);
    }

}