import { SelectorObjectInterface } from "../interfaces/selector-object.interface";
export declare function createSelector<TState>(stateKey: keyof TState, filter: (state: any) => any): SelectorObjectInterface;
