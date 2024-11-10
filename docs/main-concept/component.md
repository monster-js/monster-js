# Components in Weco JS

In **Weco JS**, components are the building blocks of the user interface. Unlike traditional component systems that rely on a virtual DOM, Weco JS leverages **watchers** to track and update bindings efficiently. This allows components to update only the parts of the view that are affected by changes, minimizing the need for complete re-renders and ensuring high performance.

## What Is a Component?

A **component** in Weco JS is a self-contained piece of the UI, responsible for managing its own state and rendering its view. Components are reactive, meaning that when the state changes, the view is automatically updated through Weco JS’s change detection system.

## Core Features of Components

1. **No Virtual DOM**:
   - Unlike React or other frameworks that use a virtual DOM to manage updates, Weco JS components use **watchers** to track changes in state or data bindings.
   - Only the necessary parts of the UI are updated when changes are detected, providing a more efficient and direct update mechanism.

2. **Watchers for Bindings**:
   - The Weco JS component system uses **watchers** to monitor state and data bindings in the component. When a binding is updated, the watcher evaluates whether there is an actual change in the value.
   - If a change is detected, only the affected UI elements are updated, making updates faster and more precise.

3. **Automatic Change Detection**:
   - Components automatically trigger change detection when their state changes. The change detection system will evaluate the watchers and update the UI if needed.

4. **Declarative Syntax**:
   - Similar to how React function components work, Weco JS components return a template (JSX-like) that defines the structure of the UI.

5. **Lifecycle Hooks**:
   - Weco JS components support web component lifecycle hooks that allow developers to react to different phases in the lifecycle of the component. These hooks include:
     - `connectedCallback`: Called when the component is first connected to the DOM.
     - `disconnectedCallback`: Called when the component is removed from the DOM.
     - `attributeChangedCallback`: Invoked when one of the component’s attributes is changed.
     - `adoptedCallback`: Triggered when the component is moved to a new document.
   
   These hooks offer precise control over component behavior during different stages of its lifecycle. More detailed documentation on each lifecycle hook will be provided separately.

## Creating a Component

A component in Weco JS is defined as a JavaScript function that returns a template. It accepts props and manages its own state using `createState` or uses shared state from `createSharedState`.

### Syntax Example

```tsx
function Button() {
    const [count, setCount] = createState(this, 0);

    return <button on:click={setCount(count() + 1)}>
        Count: {count()}
    </button>
}
```

## Key Points
* **State Management**:
    * `createState` is used to initialize and manage component-specific state. When the state is updated, Weco JS triggers change detection, and the watchers monitor any changes in bindings.
* **Reactive Bindings**:
    * Data bindings like `{count()}` are automatically tracked by the watchers. When the state changes, the binding is evaluated to check if it has been updated, and if so, the UI is re-rendered with the new value.
* **Event Handling**:
    * Events such as `on:click` trigger updates to the state, which in turn updates the bound UI elements. The `setCount()` function is used to change the state and trigger the corresponding UI update.

## How Watchers Work
* **Binding Tracking**:
    * Whenever a binding is created (like `count()`), a watcher is automatically set up to monitor that binding.
* **Change Evaluation**:
    * When a state is updated (e.g., through `setCount()`), the watcher evaluates if the new value is different from the previous one.
* **Efficient UI Updates**:
    * If the watcher detects a change in the value, only the parts of the UI associated with that binding are updated.
    * If no change is detected, Weco JS skips the UI update for that binding, improving performance by avoiding unnecessary re-renders.

### Example: Watchers in Action
```tsx
function Counter() {
    const [count, setCount] = createState(this, 0);

    return <div>
        <h1>Count: {count()}</h1>
        <button on:click={setCount(count() + 1)}>Increase</button>
    </div>
}
```

In this example:

* The `count()` binding is tracked by a watcher.
* When the button is clicked, `setCount()` is called, triggering change detection.
* The watcher evaluates the new value of `count()`. If it has changed, only the `<h1>` tag containing the `count()` binding is updated in the DOM.

## Web Component Lifecycle Hooks

Weco JS components support several web component lifecycle hooks, which allow developers to control the behavior of a component at different points in its lifecycle. Here’s an overview of the supported hooks:

* `connectedCallback`: Called when the component is first added to the DOM.
```ts
connectedCallback(this, () => {
    // Execute code when the component is attached to the DOM
});
```

* `disconnectedCallback`: Invoked when the component is removed from the DOM.
```ts
disconnectedCallback(this, () => {
    // Execute code when the component is detached from the DOM
});
```

* `attributeChangedCallback`: Triggered when an attribute of the component is changed.
```ts
attributeChangedCallback(this, (attrName, oldVal, newVal) => {
    // Execute code when a specified attribute is modified
});
```

* `adoptedCallback`: Called when the component is moved to a new document.
```ts
adoptedCallback(this, () => {
    // Execute code when the component is adopted by a new document
});
```

Detailed documentation on these lifecycle hooks will be provided separately, explaining how to leverage them for more advanced component behavior.

## Component Lifecycle in Weco JS

Though components in Weco JS are simpler compared to class-based or complex lifecycle-based systems, they still have important phases:

* **Initialization**:
    *When a component is instantiated, the state is initialized, and bindings are set up with watchers.
* **Rendering**:
    * The component renders its initial view based on the current state. This is the first time watchers are set up to track bindings.
* **State Change & Re-render**:
    * When a state update is triggered, the change detection system evaluates the bindings, and only the necessary UI elements are re-rendered.
* **Destruction**:
    * When a component is destroyed, Weco JS cleans up the watchers and any other resources associated with the component to prevent memory leaks.

### Example of Component Lifecycle
```tsx
function Timer() {
    const [time, setTime] = createState(this, 0);

    // Update time every second
    setInterval(() => {
        setTime(time() + 1);
    }, 1000);

    return <h1>Elapsed Time: {time()} seconds</h1>;
}
```

* **Initialization**: The `time` state is initialized to `0`.
* **Rendering**: The component renders the `<h1>` element displaying the current `time()`.
* **State Change & Re-render**: Every second, `setTime()` is called, triggering the change detection system. The binding is evaluated, and the UI is updated to show the new time.
* **Destruction**: If the component is removed from the DOM, the associated watchers and state are cleaned up.

## Best Practices for Components

* **Leverage Watchers**: Use Weco JS’s built-in watchers by utilizing state functions like `count()`. This ensures that changes to state are automatically tracked and reflected in the UI.
* **Avoid Direct DOM Manipulation**: Let Weco JS handle DOM updates through watchers. Directly manipulating the DOM outside of the component system can lead to inconsistencies.
* **Optimize State Management**: Keep the component’s state minimal and focused on what the component needs to display. If the state is shared across multiple components, use `createSharedState` instead.