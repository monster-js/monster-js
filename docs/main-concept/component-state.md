# Component State

Component state refers to the internal state managed within a specific component. This state is unique to the component and allows it to maintain its own data and reactivity. By using component state, developers can create interactive and dynamic components that respond to user interactions and other events.

## Creating Component State

The `createState` function is used to manage the state within a component. It enables the component to track its own data and automatically update the UI when the state changes.

## Syntax

```ts
const [state, setState] = createState(<context>, <initial value>);
```

* `<context>`: The context of the component (typically `this`).
* `<initial value>`: The initial value of the component state.

## Parameters

1. `<context>`
    * A reference to the component (`this`) where the state is being defined.
    * This allows the state to be bound to the lifecycle and context of the specific component.
2. `<initial value>`
    * The starting value for the component state variable.
    * Can be of any type (number, string, object, array, etc.).

## Return Value

The createState function returns an array containing two elements:
* `state`: A function that, when invoked, returns the current value of the state.
* `setState`: A function used to update the state value, which triggers change detection for the component to run if the value changes.

## Example

Here’s a simple example of a button component that tracks its own click count using component state:

```tsx
function Button() {
    const [count, setCount] = createState(this, 0);

    return <button on:click={setCount(count() + 1)}>
        Count: {count()}
    </button>
}
```

## How It Works

* **State Initialization**:
    * The `createState` function initializes a state variable, `count`, with a starting value of `0`.
    * It returns a getter `count()` and a setter `setCount()` for accessing and updating the value.
* **Updating the Component State**:
    * When the button is clicked, the `on:click` handler calls `setCount(count() + 1)`, which updates the state.
    * This triggers change detection, causing the component to update the UI to reflect the new value of `count`.
* **Getter Function**:
    * `count()` is used to access the current value of the component state, ensuring that any reactivity is preserved and the UI displays the most up-to-date value.

## Usage Notes
1. **Reactive Updates**:
    * Each time `setCount()` is called with a new value, the component automatically runs change detection and updates the UI with the latest value of `count()`.
2. **Referencing State**:
    * The state variable (`count`) is accessed by calling it as a function (`count()`). This practice ensures that the latest value is always retrieved during change detection.

## Best Practices
* **Encapsulate Component Logic**: Use component state to manage data that is specific to a component. This encapsulation helps keep components self-contained and easy to manage.
* **Avoid Direct Mutations**: Always utilize the `setState()` function to update the component state instead of directly mutating the state variable. This approach ensures that change detection is properly triggered, allowing the component to respond accurately with the updated state.
