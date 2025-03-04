# Change Detection

Change detection is a core mechanism in Monster JS framework, responsible for ensuring that the user interface (UI) stays synchronized with the underlying application state. Whether the state is local to a component or shared across multiple components, change detection monitors any updates to that state and triggers the necessary UI updates to reflect those changes.

## Overview

In our framework, change detection operates behind the scenes, automatically monitoring the state (whether component-specific or shared) and updating the UI when necessary. This ensures a reactive user experience where the interface remains in sync with the latest data or interactions.

## How Change Detection Works

1. **State Change Monitoring**:
    * When a state is created using `createState` or `createSharedState`, the framework monitors changes to that state.
    * Anytime the state is updated via `setState()` or `setSharedState()`, the change detection system is triggered.
2. **UI Updates**:
    * When a state change is detected, the framework efficiently updates the DOM to reflect the new values.
    * Only the affected parts of the UI are updated, ensuring minimal performance impact.
3. **Context Binding**:
    * State is bound to the component’s lifecycle (using `this` as context), allowing the change detection to know when a specific component should be updated or destroyed.

## Change Detection in Action

Change detection is automatically triggered whenever state changes, whether the state is local to a single component or shared across multiple components. Here’s how it applies to both scenarios:

* **Component State**:
    * Defined using `createState` within a component.
    * The state is isolated to that specific component, and only the UI for that component is updated when the state changes.
* **Shared State**:
    * Defined using `createSharedState` and used across multiple components.
    * When shared state changes, all components that use that state will undergo change detection and update their UI accordingly.

### Example 1: Change Detection with Component State

```tsx
function Button() {
    const [count, setCount] = createState(this, 0);

    return <button on:click={setCount(count() + 1)}>
        Count: {count()}
    </button>
}
```

In this example:
* The component state `count` is updated via `setCount()`.
* Change detection triggers the UI to update and show the new `count` value.

### Example 2: Change Detection with Shared State

```tsx
// shared.state.ts
export const countSharedState = createSharedState(0);

// button.component.ts
function Button() {
    const [count, setCount] = countSharedState(this);

    return <button on:click={setCount(count() + 1)}>
        Count: {count()}
    </button>
}
```

In this example:
* The shared state `count` is updated via `setCount()`.
* Any component that relies on `countSharedState` will have its UI updated when the shared state changes.

## Manually trigger change detection

To manually trigger change detection, we can use the `detectChanges` function.
This function is a utility in the Monster JS framework that allows developers to manually trigger change detection inside a component. This can be useful in scenarios where the state is updated outside the usual state management flow or when you need more control over when the UI is refreshed.

### When to Use `detectChanges`

While the Monster JS framework automatically handles change detection when using `setState()` or `setSharedState()`, there are cases where you might need to manually trigger a UI update:

* **Updating a Variable that is Not a State**: If you update a regular variable that isn't managed by the framework's state system but still affects the UI, you can use `detectChanges` to manually trigger the necessary updates.
* **Manual Control**: In situations where you want to optimize performance by controlling exactly when change detection occurs.

### How to Use `detectChanges`

To use `detectChanges`, simply call the function within the component's context. It will manually trigger change detection, ensuring that the UI reflects the latest state.

#### Example 1: Using `detectChanges` with External Event Listener

```tsx
function ExternalEventComponent() {
    let count = 0;

    connected(this, () => {
        window.addEventListener('externalEvent', () => {
            count += 1;
            detectChanges(this); // Manually trigger change detection
        });
    });

    return <div>External Event Count: {count}</div>;
}
```

In this example:

* An external event listener is added to the window object.
* The state is updated in the event handler.
* `detectChanges(this)` is called to manually trigger change detection, ensuring that the UI updates.

## Key Features of Change Detection
* **Automatic UI Updates**: No need to manually refresh or re-render components. Change detection handles it automatically whenever the state is updated.
* **Efficient DOM Updates**: Only the parts of the DOM that are affected by the state change are updated, making the process highly efficient.
* **Reactive State Management**: Whether using component state or shared state, the system guarantees that UI reflects the most up-to-date values.
* **Minimal Boilerplate**: Developers only need to manage state updates (e.g., through `setState()` or `setSharedState()`), and the framework takes care of syncing the UI.

## Best Practices for Change Detection
* **Use State Updaters**: Always update state using the provided `setState()` or `setSharedState()` functions. This ensures that change detection is properly triggered.
* **Avoid Direct State Mutation**: Mutating the state directly without using the updater functions will bypass change detection and may lead to inconsistent UI behavior.
* **Optimize Shared State**: Use shared state judiciously to prevent unnecessary updates across multiple components when changes are not required.
