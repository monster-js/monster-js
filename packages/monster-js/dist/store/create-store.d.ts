import { SelectorObjectInterface } from "../interfaces/selector-object.interface";
import { ActionPayloadType } from "../types/action-payload.type";
import { ActionReducerType } from "../types/action-reducer.type";
import { ActionReducersType } from "../types/action-reducers.type";
export declare function createStore<T>(initialState: T, actionReducers: ActionReducersType<T>): {
    dispatch: <A extends ActionReducerType<any, any>>(action: A, payload?: ActionPayloadType<A>) => void;
    select: <TT>(fnComponent: any, selector: SelectorObjectInterface) => {
        value: () => TT;
        subscribe: (callback: (value?: any) => any) => void;
    };
    get: (fnComponent: any, stateKey: keyof T) => {
        value: () => T[keyof T];
        subscribe: (callback: (value?: any) => any) => void;
    };
};
