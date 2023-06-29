import { FunctionComponent } from "@monster-js/core";
import { StoreFn } from "./create-store";

export function createSelector<T, K extends keyof T>(store: StoreFn<T>, key: K) {
    return function<C, A = any>(callback: (state: T[K], params?: A) => C) {
        return function(context: FunctionComponent) {
            const [getter] = store(context, key);
            return (params?: A) => callback(getter(), params);
        };
    }
}