import { SelectorObjectInterface } from "../interfaces/selector-object.interface";

export function createSelector<TState>(stateKey: keyof TState, filter: (state: any) => any): SelectorObjectInterface {
    return {
        stateKey,
        filter
    };
}
