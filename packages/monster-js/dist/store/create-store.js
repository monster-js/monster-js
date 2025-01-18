export function createStore(initialState, actionReducers) {
    let state = Object.freeze(initialState);
    let changeDetections = [];
    let subscribers = [];
    const addComponent = (component) => {
        if (!changeDetections.includes(component)) {
            changeDetections.push(component);
        }
    };
    const runSubscribers = (stateKey) => {
        subscribers.forEach((subscriber) => {
            if (subscriber.stateKey === stateKey && subscriber.isConnected()) {
                const newValue = subscriber.valueCaller();
                if (subscriber.value !== newValue) {
                    subscriber.value = newValue;
                    subscriber.callback(newValue);
                }
            }
        });
        subscribers = subscribers.filter((subscriber) => subscriber.isConnected());
    };
    const modifyState = (newState, stateKey) => {
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
        runSubscribers(stateKey);
    };
    const actionReducersStateKeyMap = new WeakMap();
    const actionReducersNameMap = new WeakMap();
    Object.keys(actionReducers).forEach((key) => {
        Object.keys(actionReducers[key]).forEach((key2) => {
            const fn = actionReducers[key][key2];
            actionReducersStateKeyMap.set(fn, key);
            actionReducersNameMap.set(fn, key2);
        });
    });
    return {
        dispatch: (action, payload = null) => {
            const stateKey = actionReducersStateKeyMap.get(action);
            modifyState(action(state[stateKey], payload), stateKey);
        },
        select: (fnComponent, selector) => {
            addComponent(fnComponent);
            return {
                value: () => selector.filter(state[selector.stateKey]),
                subscribe: (callback) => {
                    const subscriber = {
                        stateKey: selector.stateKey,
                        value: selector.filter(state[selector.stateKey]),
                        valueCaller: () => selector.filter(state[selector.stateKey]),
                        callback: callback,
                        isConnected: () => fnComponent.isConnected
                    };
                    subscribers.push(subscriber);
                    callback(subscriber.value);
                }
            };
        },
        get: (fnComponent, stateKey) => {
            addComponent(fnComponent);
            return {
                value: () => state[stateKey],
                subscribe: (callback) => {
                    const subscriber = {
                        stateKey,
                        value: state[stateKey],
                        valueCaller: () => state[stateKey],
                        callback: callback,
                        isConnected: () => fnComponent.isConnected
                    };
                    subscribers.push(subscriber);
                    callback(subscriber.value);
                }
            };
        },
    };
}
//# sourceMappingURL=create-store.js.map