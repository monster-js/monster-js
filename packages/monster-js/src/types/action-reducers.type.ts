import { ActionReducerType } from "./action-reducer.type";

export type ActionReducersType<State> = {
    [K in keyof State]: {
        [Action: string]: ActionReducerType<State[K], any>;
    };
};
