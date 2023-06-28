import { StoreFn } from "./create-store";

export function createActionCreator<T, K extends keyof T>(store: StoreFn<T>, key: K) {
    const [getter, setter] = store(null, key);

    return function<P = any>(reducer: (state: T[K], payload: P) => T[K], message: string) {

        return function(payload: P) {
            const newState = reducer(getter(), payload);
            setter(newState, message)
        };
    }
}