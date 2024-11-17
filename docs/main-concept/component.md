# Components in Weco JS

In **Weco JS**, components are the core building blocks of the user interface.
Unlike traditional frameworks that rely on a virtual DOM, Weco JS employs **watchers** to efficiently track and update data bindings.
This design ensures that only the affected parts of the view are updated, reducing the need for complete re-renders and delivering high performance.

## What is a Component?

A **component** in Weco JS is a self-contained unit of the UI.
It manages its own state and renders its view reactively.
When the component's state changes, its view is automatically updated using Weco JS’s built-in change detection system.

## Key Features of Weco JS Components

1. **No Virtual DOM**

Weco JS does not rely on a virtual DOM for updates. Instead:
* **Watchers** track changes in state or data bindings.
* Only the necessary parts of the UI are updated when changes are detected, making updates faster and more direct.

2. **Watchers for Data Bindings**
* Each binding is monitored by a **watcher**, which evaluates whether the binding's value has changed.
* If a change is detected, only the affected UI elements are updated, ensuring efficient updates.

3. **Automatic Change Detection**
* When the component's state changes, Weco JS automatically triggers its change detection system.
* The system evaluates watchers and updates the UI precisely where needed.

4. **Declarative Syntax**
* Weco JS components return a JSX-like template that defines the structure of the UI.
* This syntax is intuitive and similar to other modern frameworks like React.

5. **Lifecycle Hooks**

Weco JS components provide lifecycle hooks to manage their behavior at different stages:
* `connected`: Triggered when the component is added to the DOM.
* `afterViewInit`: Triggered after the component’s view have been fully initialized and connected in the DOM.
* `disconnected`: Triggered when the component is removed from the DOM.
* `attributeChanged`: Invoked when one of the component’s attributes changes.
* `adopted`: Called when the component is moved to a new document.

These hooks give developers precise control over a component's behavior and can be used to perform tasks like cleanup or initialization.

## Creating a Component

To define a component in Weco JS:

1. Use a JavaScript function that returns a JSX-like template.
2. Manage state using `createState` (for component-specific state) or `createSharedState` (for shared state across components).

### Example: Creating a Button Component

```tsx
function Button() {
    const [count, setCount] = createState(this, 0);

    return (
        <button on:click={setCount(count() + 1)}>
            Count: {count()}
        </button>
    );
}
```

## How Watchers Work

Watchers are central to Weco JS’s reactivity. Here's how they operate:

1. **Tracking Bindings:**
* When a binding is created (e.g., `count()`), a watcher is set up to monitor it.
2. **Evaluating Changes:**
* When state is updated (e.g., via `setCount()`), the watcher checks if the new value differs from the previous one.
3. **Efficient Updates:**
* If a change is detected, only the affected UI elements are updated.
* If no change is found, the update is skipped, ensuring optimal performance.

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

#### Explanation:

* The `count()` binding is tracked by a watcher.
* Clicking the button triggers `setCount()`, initiating change detection.
* If `count()` changes, the `<h1>` element updates without re-rendering the entire component.

## Best Practices for Weco JS Components

1. **Utilize Watchers Effectively:**
* Always use state functions like `count()` to ensure changes are automatically tracked and reflected in the UI.
2. **Avoid Direct DOM Manipulation:**
* Let Weco JS handle DOM updates. Manual DOM manipulation can lead to inconsistencies.
3. **Keep State Minimal:**
* Define state specific to the component’s needs. For shared state, use `createSharedState`.
4. **Leverage Lifecycle Hooks:**
* Use lifecycle hooks to manage component behavior during setup, teardown, or attribute changes.

## Summary

Weco JS components combine the simplicity of declarative syntax with the efficiency of watcher-driven updates. By focusing on reactivity without a virtual DOM, Weco JS offers a modern, high-performance framework for building responsive user interfaces.
* **Efficient Updates**: Thanks to watchers, only the necessary parts of the UI are updated.
* **Reactive State**: State changes automatically trigger precise UI updates.
* **Declarative Syntax**: JSX-like templates make component creation straightforward.

Start building with Weco JS today to create fast and reactive applications!
