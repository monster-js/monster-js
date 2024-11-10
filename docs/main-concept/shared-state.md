# Shared State

Shared state allows multiple components to access and modify a common piece of state. This mechanism is particularly useful for managing application-wide data or enabling communication between unrelated components. By using shared state, developers can create a more cohesive and responsive user experience.

## Using a Shared State

The `createSharedState` function enables the creation of a shared state that can be accessed by various components. This function establishes a central piece of state that multiple components can read from and write to, ensuring synchronization across the application.

### Syntax

```ts
const sharedState = createSharedState(initialValue);
```

* `initialValue`: The initial value of the shared state.

### Parameters

* initialValue
    * The starting value for the shared state.
    * Can be of any type (number, string, object, array, etc.).

### Return Value

The `createSharedState` function returns a function that can be invoked within components to access and manage the shared state. This function returns an array containing two elements:

* `state`: A function that, when invoked, returns the current value of the shared state.
* `setState`: A function used to update the shared state value, triggering change detection for all components using this state.

### Example

Here’s a simple example of how to create and use a shared state in a button component:

#### Shared State Definition

```ts
// shared.state.ts
export const countSharedState = createSharedState(0);
```
#### Component Implementation

```tsx
// button.component.ts
function Button() {
    const [count, setCount] = countSharedState(this);

    return <button on:click={setCount(count() + 1)}>
        Count: {count()}
    </button>
}
```

### How It Works

* <strong>Shared State Initialization</strong>:
    * The `createSharedState` function initializes a shared state variable, `countSharedState`, with a starting value of `0`.
* <strong>Component Access</strong>:
    * In the `Button` component, the shared state is accessed by calling `countSharedState(this)`, which returns the current value of `count` and a setter function `setCount`.
* <strong>Updating the Shared State</strong>:
    * When the button is clicked, the `on:click` handler calls `setCount(count() + 1)`, which updates the shared state.
    * This triggers change detection across all components that use `countSharedState`, ensuring that the UI remains in sync.

### Usage Notes

1. <strong>Reactive Updates</strong>:
    * Each time `setCount()` is called with a new value, all components that reference the shared state automatically update to reflect the latest value of `count()`.
2. <strong>Accessing State</strong>:
    * The shared state variable (`count`) is accessed by calling it as a function (`count()`). This ensures that components always retrieve the most recent value during change detection.

### Best Practices
* <strong>Use Shared State for Global Data</strong>: Utilize shared state for application-wide data or states that need to be accessed by multiple components to maintain synchronization and avoid redundant state management.
* <strong>Avoid Direct Mutations</strong>: Always use the provided `setState()` function to update the shared state instead of directly mutating the state variable. This practice ensures that all dependent components receive the updated value and re-render accordingly.
