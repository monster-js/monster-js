# Component

In **Monster JS**, components are the core building blocks of the user interface. Unlike traditional frameworks that rely on a virtual DOM, Monster JS employs **watchers** to efficiently track and update data bindings. This ensures that only the affected parts of the view are updated, reducing the need for complete re-renders and delivering high performance.

## What is a Component?

A **component** in Monster JS is a self-contained unit of the UI. It manages its own state and renders its view reactively. When the component's state changes, its view is automatically updated using Monster JS’s built-in change detection system.

## Key Features of Monster JS Components

### 1. No Virtual DOM

Monster JS does not rely on a virtual DOM for updates. Instead:

* **Watchers** track changes in state or data bindings.
* Only the necessary parts of the UI are updated when changes are detected, making updates faster and more direct.

### 2. Watchers for Data Bindings
* Each binding is monitored by a watcher, which evaluates whether the binding's value has changed.
* If a change is detected, only the affected UI elements are updated, ensuring efficient updates.

### 3. Automatic Change Detection
* When the component's state changes, Monster JS automatically triggers its change detection system.
* The system evaluates watchers and updates the UI precisely where needed.

### 4. Declarative Syntax
* Monster JS components return a JSX-like template that defines the structure of the UI.
* This syntax is intuitive and similar to other modern JavaScript frameworks.

### 5. Lifecycle Hooks
Monster JS components provide lifecycle hooks to manage their behavior at different stages:

* [connected](/main-concept/lifecycle-hooks?id=connected): Triggered when the component is added to the DOM.
* [afterViewInit](/main-concept/lifecycle-hooks?id=afterViewInit): Triggered after the component’s view has been fully initialized and connected to the DOM.
* [disconnected](/main-concept/lifecycle-hooks?id=disconnected): Triggered when the component is removed from the DOM.
* [attributeChanged](/main-concept/lifecycle-hooks?id=attributeChanged): Invoked when one of the component’s attributes changes.
* [adopted](/main-concept/lifecycle-hooks?id=adopted): Called when the component is moved to a new document.
* [namedAttrChanged](/main-concept/lifecycle-hooks?id=namedAttrChanged): Observes changes to specific attributes and optionally applies transformations to the attribute value before passing it to the handler.

These hooks give developers precise control over a component's behavior and can be used to perform tasks like cleanup or initialization.

## Creating a Component

### Recommended: Using the CLI

The easiest and most efficient way to create a component in Monster JS is by using the CLI. This approach ensures your component is set up with the correct structure and boilerplate.

#### Steps:

1. Open your terminal and navigate to your project directory.
2. Run the following command:

```bash
mn generate component <component-name>
```

Replace `<component-name>` with the desired name of your component (e.g., `button`).

##### Example:

```bash
mn generate component button
```

This will generate a new component file with the necessary boilerplate code, including:
* A function to define the component.
* A default export.
* A `selector` configuration.

The generated file will look like this:

```tsx
import styles from './button.component.scss';
import { component } from 'monster-js';

export function ButtonComponent() {
    return <h1>ButtonComponent</h1>;
}

component(ButtonComponent, {
    selector: 'app-button',
}, styles);
```

### Manual Creation (Alternative)

To define a component in Monster JS manually, follow these steps:

1. **Create the Component File**: Create a file named `button.component.tsx`. The component file name must end with `.component.tsx`.
2. **Create the Styles File (Optional)**: Optionally, create a styles file named `button.component.scss`. The styles file name should end with `.component.scss`. This file will contain the component's styles.
3. **Define the Component Function**: In the `.tsx` file, create a function that returns JSX, defining the structure of your component.
4. **Import Styles (Optional)**: If you created a styles file, import it into your `.tsx` file and pass it to the `component` function as the third argument.

#### Example: Creating a ButtonComponent Manually

1. Create `button.component.tsx`:

```tsx
// Import styles (optional)
import styles from './button.component.scss';
import { component } from 'monster-js';

export function ButtonComponent() {
    return <button>Click Me</button>;
}

component(ButtonComponent, {
    selector: 'app-button',
}, styles); // Register component with styles (optional)
```

2. Create `button.component.scss` (Optional):

```css
button {
    background-color: blue;
    color: white;
    padding: 10px;
    border-radius: 5px;
}
```

By following these steps, you ensure that your component is properly structured and styled, and you can optionally include a styles file for CSS customizations.











To define a component in Monster JS:

### Example: Creating a ButtonComponent Manually

```tsx
import { component } from 'monster-js';

export function ButtonComponent() {
    return <h1>ButtonComponent</h1>;
}

component(ButtonComponent, {
    selector: 'app-button',
});
```

## Using a Component in its Parent Component

You can use a component within another component by simply including it in the parent’s JSX-like template:

### Example: Parent Component

```tsx
import { component } from 'monster-js';
import { ButtonComponent } from './button.component';

export function ParentComponent() {
    return <div>
        <h1>Parent Component</h1>
        <ButtonComponent />
    </div>;
}

component(ParentComponent, {
    selector: 'app-parent',
});
```

* The `ButtonComponent` is used directly within the `ParentComponent`’s template.
* No additional steps are required to include it in the parent.

## How Watchers Work

Watchers are central to Monster JS’s reactivity. Here’s how they operate:

1. **Tracking Bindings**:
    * When a binding is created (e.g., count()), a watcher is set up to monitor it.
2. **Evaluating Changes**:
    * When state is updated (e.g., via setCount()), the watcher checks if the new value differs from the previous one.
3. **Efficient Updates**:
    * If a change is detected, only the affected UI elements are updated.
    * If no change is found, the update is skipped, ensuring optimal performance.

## Example: Watchers in Action

```tsx
import { component } from 'monster-js';

export function CounterComponent() {
    const [count, setCount] = createState(this, 0);

    return <div>
        <h1>Count: {count()}</h1>
        <button on:click={setCount(count() + 1)}>Increase</button>
    </div>;
}

component(CounterComponent, {
    selector: 'app-counter',
});
```

## Best Practices for Monster JS Components

1. **Utilize Watchers Effectively**:
    * Use state functions like `count()` to ensure changes are automatically tracked and reflected in the UI.
2. **Avoid Direct DOM Manipulation**:
    * Let Monster JS handle DOM updates. Manual DOM manipulation can lead to inconsistencies.
3. **Keep State Minimal**:
    * Define state specific to the component’s needs. For shared state, use `createSharedState`.
4. **Leverage Lifecycle Hooks**:
    * Use lifecycle hooks to manage component behavior during setup, teardown, or attribute changes.

## Summary

Monster JS components combine the simplicity of declarative syntax with the efficiency of watcher-driven updates. By focusing on reactivity without a virtual DOM, Monster JS offers a modern, high-performance framework for building responsive user interfaces.

* **Efficient Updates**: Watchers ensure that only necessary parts of the UI are updated.
* **Reactive State**: State changes automatically trigger precise UI updates.
* **Declarative Syntax**: JSX-like templates make component creation straightforward.

Start building with Monster JS today to create fast and reactive applications!