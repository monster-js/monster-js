# Action Reducers

In this section, we will explain how to define, dispatch, and manage action reducers within the Weco JS Framework Store. Action reducers are functions that modify the state of the store in response to dispatched actions.

## 1. Defining an Action Reducer

Action reducers are functions that handle the state change by accepting the current state and a payload (data) as input and returning a new state. Here’s an example of how to define an action reducer:

### Example: Increment Action Reducer

```ts
export function increment(state, payload) {
    return {
        ...state,
        count: state.count + payload
    };
}
```

* **increment**: The `increment` function takes the current state and a payload (which represents the value to increment the `count` by). It returns a new state where the `count` is updated by the payload value.
* **Spread operator (**`...state`**)**: This ensures that the state is updated immutably by copying the existing state and only changing the `count` property.

## 2. Defining Action Reducers in the Store

Action reducers are grouped by the state they affect. You define these reducers as part of the `actionReducers` object, which is passed when creating the store.

### Example: Defining Action Reducers

```ts
const actionReducers = {
    counter: {
        increment
    }
};

export const store = createStore<StoreState>(initialState, actionReducers);
```

* **actionReducers**: This object holds all the action reducers for the store. In this case, the `counter` state has an `increment` action reducer.

## 3. Dispatching an Action Reducer

Once the action reducer is defined, you can dispatch it from your components to trigger state changes. The `dispatch` method allows you to invoke an action reducer.

### Example: Dispatching the `increment` Action in a Component

```ts
export function IncrementComponent() {
    const onClick = () => {
        store.dispatch(increment, 1);
    }

    return <button on:click={onClick()}>Increment</button>
}
```

* **store.dispatch(increment, 1)**: This line dispatches the `increment` action with a payload of `1`, which will update the `count` in the store.
* **onClick event**: When the button is clicked, the `increment` action is dispatched to the store, and the `count` will be incremented by `1`.

## Conclusion

In summary, action reducers in the Weco JS Framework Store allow you to define how your state should change in response to specific actions. By following these steps, you can:
1. **Define action reducers**: Create functions that modify state based on actions.
2. **Add action reducers to the store**: Group them under state keys.
3. **Dispatch actions**: Use the `dispatch` method to invoke action reducers and update the state.

This approach allows you to manage your application’s state efficiently and consistently. In the next sections, we will dive deeper into selectors and subscriptions to enhance the data flow and reactivity in your application.