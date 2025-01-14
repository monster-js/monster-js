import { createSelector } from "./create-selector";
import { createStore } from "./create-store";
const initialState = {
    counter: {
        count: 0
    },
    counter2: {
        count2: '0'
    },
};
export function increment(state, payload) {
    return {
        ...state,
        count: state.count + payload
    };
}
export function increment2(state, payload) {
    return {
        ...state,
        count: state.count2 + payload
    };
}
const actionReducers = {
    counter: {
        increment
    },
    counter2: {
        increment2
    }
};
export const store = createStore(initialState, actionReducers);
store.dispatch(increment, 1);
store.dispatch(increment2, '1');
const selectCount = createSelector('', (state) => state.count2);
const x = store.select(selectCount).value;
//# sourceMappingURL=test.js.map