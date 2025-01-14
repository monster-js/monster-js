# Attribute Binding

Attribute binding in **Monster JS** allows you to dynamically set HTML attributes based on the component’s state, enabling the UI to reflect changes in the data. By binding attributes to state variables, attributes like `id`, `class`, and `style` can automatically update as the state changes, creating more interactive and responsive components.

## Basic Usage of Attribute Binding

In Monster JS, attribute binding is achieved by embedding expressions within attribute values. When the state changes, the attribute automatically updates, reflecting the latest value in the HTML element.

### Example: Dynamic `id` Attribute Binding

```tsx
function ButtonAttrBinding() {
    const [count, setCount] = createState(this, 0); // Initialize state with 0

    return <button id={'count-' + count()} on:click={setCount(count() + 1)}>Increment</button>
}
```

#### Explanation

* **State Initialization**: The `createState(this, 0)` function initializes the `count` state variable with a value of `0`.
* **Dynamic Attribute Binding**: The `id` attribute of the `<button>` element is dynamically set to `'count-' + count()`. Each time the button is clicked, `count` increments, updating the `id` with the new value (e.g., `count-1`, `count-2`, etc.).
* **Event Binding**: The `on:click` attribute is used to attach an event handler that triggers the `onClick` function. This function increments `count` and updates the `id` accordingly.

## Binding Multiple Attributes

You can bind multiple attributes to the same or different state variables within a component. Here’s an example that dynamically updates both `id` and `disabled` attributes:

```tsx
function ToggleButton() {
    const [isEnabled, setEnabled] = createState(this, true);

    return <div>
        <button
            id={isEnabled() ? 'enabled' : 'disabled'}
            disabled={!isEnabled()}
        >
            {isEnabled() ? 'Enabled' : 'Disabled'}
        </button>
        <button on:click={setEnabled(!isEnabled())}>Click Me</button>
    </div>
}
```

In this example:

* The `id` attribute is conditionally set based on `isEnabled`, switching between `'enabled'` and `'disabled'`.
* The `disabled` attribute is also bound to `isEnabled`, setting the button as disabled when `isEnabled` is `false`.

## Common Use Cases for Attribute Binding

Attribute binding is useful in scenarios where:
* **Dynamic Styling**: Set `class` or `style` attributes based on component state.
* **Unique Identifiers**: Update `id` or `name` attributes to track elements dynamically.
* **Conditional Properties**: Bind properties like `disabled`, `readonly`, or `hidden` to control UI elements' availability based on state.

## Summary

Attribute binding in Monster JS enables components to:

* **Reactively Update Attributes**: HTML attributes automatically reflect changes in state.
* **Increase UI Interactivity**: Elements respond dynamically to user actions or data changes.
* **Enhance Component Control**: Easily manage element properties through reactive state, creating more flexible and interactive components.

This approach makes it easier to manage complex components and build a highly interactive user experience.
