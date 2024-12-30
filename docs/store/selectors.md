# Selectors

In this section, we will explore how to create and use selectors in the Weco JS Framework Store. Selectors are functions that allow you to retrieve specific slices of state in an efficient and reusable manner.

## 1. What is a Selector?

A selector is a function that extracts a specific part of the state from the store. It can be used to access nested data or perform computations on the state before returning it. Selectors help optimize performance by avoiding unnecessary recalculations and re-renders.

## 2. Creating a Selector

To create a selector, you define a function that accepts the entire store state as its argument and returns a derived value from the state. You can also use the `createSelector` utility to simplify the process.

### Example: Creating a Selector for the `counter` State

```ts
export const counterSelector = createSelector<StoreState>('counter', (counter) => counter.count);
```

* `createSelector`: The `createSelector` utility helps in defining selectors by specifying the part of the state to select (`'counter'` in this case) and a function that maps the state slice to the desired value (`counter.count`).
* `counterSelector`: This selector returns the `count` from the `counter` state. It can be reused in components to efficiently access the `count` value.

## 3. Using Selectors in Weco JS Components

Once you have defined a selector, you can use it in your components to access the relevant part of the state.

### Example: Using the `counterSelector` in a Component

```ts
export function CountComponent() {
    const count = store.select(counterSelector).value;

    return <h1>Count: {count()}</h1>;
}
```

* **store.select(counterSelector)**: This line uses the `select` method to retrieve the value of `count` from the store using the `counterSelector`.
* `count()`: The result of `store.select(counterSelector)` is a function that you can invoke to get the current value of `count` from the store.

## 4. Benefits of Using Selectors

* **Encapsulation**: Selectors help encapsulate the logic for accessing specific parts of the state. This means you don’t have to repeat the same logic across components.
* **Performance Optimization**: By using selectors, the application can avoid unnecessary re-renders or recalculations since the selector will only recompute when the relevant state changes.
* **Reusability**: Once defined, selectors can be reused in multiple components, making your codebase cleaner and more maintainable.

## Conclusion

Selectors are an essential part of the Weco JS Framework Store, allowing you to efficiently access and derive state values. By using selectors, you can:
1. **Create reusable functions** to extract state slices.
2. **Optimize performance** by avoiding unnecessary computations.
3. **Improve code maintainability** by keeping state access logic centralized.

In the next sections, we will dive into subscribing to state and selector changes to make your application responsive to updates in the store.