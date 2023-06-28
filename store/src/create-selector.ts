import { FunctionComponent } from "@monster-js/core";
import { StoreFn } from "./create-store";

export function createSelector<T, K extends keyof T>(store: StoreFn<T>, key: K) {
    return function<C = any>(callback: (state: T[K]) => C) {
        return function(context: FunctionComponent) {
            const [getter] = store(context, key);
            return () => callback(getter());
        };
    }
}