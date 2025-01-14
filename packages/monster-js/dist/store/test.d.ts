interface StoreState {
    counter: {
        count: number;
    };
    counter2: {
        count2: string;
    };
}
export declare function increment(state: StoreState['counter'], payload: number): {
    count: number;
};
export declare function increment2(state: StoreState['counter2'], payload: string): {
    count: string;
    count2: string;
};
export declare const store: {
    dispatch: <A extends import("../types/action-reducer.type").ActionReducerType<any, any>>(action: A, payload?: import("../types/action-payload.type").ActionPayloadType<A>) => void;
    select: <TT>(selector: import("../interfaces/selector-object.interface").SelectorObjectInterface) => {
        value: () => TT;
        subscribe: (fnComponent: any, callback: (value?: any) => any) => void;
    };
    get: (stateKey: keyof StoreState) => {
        value: () => {
            count: number;
        } | {
            count2: string;
        };
        subscribe: (fnComponent: any, callback: (value?: any) => any) => void;
    };
};
export {};
