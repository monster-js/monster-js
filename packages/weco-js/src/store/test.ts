import { ActionReducersType } from "../types/action-reducers.type";
import { createSelector } from "./create-selector";
import { createStore } from "./create-store";

interface StoreState {
    counter: {
        count: number;
    };
    counter2: {
        count2: string;
    };
}

const initialState: StoreState = {
    counter: {
        count: 0
    },
    counter2: {
        count2: '0'
    },
};

export function increment(state: StoreState['counter'], payload: number) {
    return {
        ...state,
        count: state.count + payload
    };
}
export function increment2(state: StoreState['counter2'], payload: string) {
    return {
        ...state,
        count: state.count2 + payload
    };
}

const actionReducers: ActionReducersType<StoreState> = {
    counter: {
        increment
    },
    counter2: {
        increment2
    }
};

export const store = createStore<StoreState>(initialState, actionReducers);

store.dispatch(increment, 1);
store.dispatch(increment2, '1');

const selectCount = createSelector('', (state) => state.count2);

const x = store.select<string>(selectCount).value;
