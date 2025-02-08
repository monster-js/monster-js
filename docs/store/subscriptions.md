# Subscriptions

In this section, we will explore how to subscribe to state and selector changes in the Monster JS Framework Store. Subscriptions allow you to listen for changes in the store and update your application’s UI or logic in response to those changes.

## 1. What is a Subscription?

A subscription in the Monster JS Framework Store allows components or services to be notified when a specific part of the state or selector has changed. This is an essential concept for creating reactive applications, as it allows your UI to stay in sync with the store's state automatically.

## 2. Subscribing to State Changes

You can subscribe to a specific state, and your component will be notified whenever that state changes. Subscriptions are automatically cleaned up when the component is unmounted or no longer connected to the store.

### Example: Subscribing to Changes in the `counter` State

```ts
export function CountComponent() {
    store.get(this, 'counter').subscribe(() => {
        console.log('counter state changed');
    });

    return <h1>...</h1>;
}
```
* **store.get(this, 'counter')**: This retrieves the `counter` state from the store. The `this` context refers to the component or instance.
* **.subscribe(callback)**: The `subscribe` method listens for changes to the `counter` state. The callback function is called whenever the state changes, and in this example, it logs `'counter state changed'` to the console.
* **Automatic Unsubscription**: When the component is no longer connected to the DOM (e.g., unmounted), the subscription is automatically unsubscribed, preventing memory leaks.

## 3. Subscribing to Selector Changes

In addition to subscribing to entire states, you can subscribe to selector changes. This is useful when you want to react to changes in a derived value or a specific slice of the state.

### Example: Subscribing to Changes in the `counterSelector`

```tsx
export function CountComponent() {
    store.select(this, counterSelector).subscribe(() => {
        console.log('counter count changed');
    });

    return <h1>...</h1>;
}
```
* **store.select(this, counterSelector)**: This retrieves the value of the `counter` state using the `counterSelector`.
* **.subscribe(callback)**: The `subscribe` method listens for changes in the value derived by the `counterSelector`. Every time the value changes, the callback function is invoked. In this example, it logs `'counter count changed'` to the console.
* **Automatic Unsubscribe**: Like state subscriptions, when the component is removed or disconnected, the subscription will automatically be cleaned up.

## 4. Benefits of Subscriptions

* **Reactivity**: Subscriptions allow you to automatically update your application whenever the state changes, ensuring your UI is always in sync with the store.
* **Efficiency**: The subscription mechanism ensures that your components are only recalculated when the relevant state or selector changes, improving performance.
* **Centralized Logic**: Subscriptions provide a centralized way to handle state changes, keeping your components clean and focused on their UI logic.

## Conclusion

Subscriptions in the Monster JS Framework Store are a powerful feature that enables reactivity and automatic updates to your components. By subscribing to state and selector changes, you can:

1. **React to state changes**: Automatically trigger updates when the store’s state or selectors change.
2. **Keep your UI in sync**: Ensure that your UI always reflects the latest state without manual intervention.
3. **Improve performance**: Limit recalculation to only when the relevant data has changed.

Subscriptions are an essential part of building dynamic, responsive applications with the Monster JS Framework Store.
