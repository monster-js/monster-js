type ActionReducerType<S, P> = (state: S, payload: P) => S;

// type ExtractPayload<A> = A extends (state: any, payload: infer P) => any ? P : never;

export type ActionReducersType<State> = {
    [K in keyof State]: {
        [Action: string]: ActionReducerType<State[K], any>;
    };
};

export function createStore<T>(initialState: T, actionReducers: ActionReducersType<T>) {
    let state: T = Object.freeze(initialState);
    let changeDetections: { isConnected: boolean; detectChanges: () => any; }[] = [];

    const modifyState = (newState: T[keyof T], stateKey: keyof T) => {
        state = Object.freeze({
            ...state,
            [stateKey]: newState
        });

        changeDetections.forEach((changeDetection) => {
            if (changeDetection.isConnected) {
                changeDetection.detectChanges();
            }
        });
        changeDetections = changeDetections.filter((changeDetection) => changeDetection.isConnected);
    }

    const actionReducersStateKeyMap = new WeakMap<any, keyof T>();

    Object.keys(actionReducers).forEach((key) => {
        Object.keys(actionReducers[key as keyof T]).forEach((key2) => {
            const fn = actionReducers[key as keyof T][key2];
            actionReducersStateKeyMap.set(fn, key as keyof T);
        });
    });

    return {
        dispatch: (action: ActionReducerType<T[keyof T], any>, payload: any = null) => {
            const stateKey = actionReducersStateKeyMap.get(action);
            modifyState(action(state[stateKey], payload), stateKey);
        }
    };
}


interface StoreState {
    counter: {
        count: number;
    };
}

const initialState: StoreState = {
    counter: {
        count: 0
    }
};

export function increment(state: StoreState['counter'], payload: number) {
    return {
        ...state,
        count: state.count + payload
    };
}

const actionReducers: ActionReducersType<StoreState> = {
    counter: {
        increment
    }
};

export const store = createStore<StoreState>(initialState, actionReducers);