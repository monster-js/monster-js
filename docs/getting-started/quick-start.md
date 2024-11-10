# Quick Start Guide

**Weco JS** provides a modern approach to building web components without relying on a virtual DOM. It uses watchers to efficiently track and update bindings, resulting in responsive and performant UI components. This guide will help you quickly get started with creating and managing components in Weco JS.

## Installation

First, install Weco JS using npm:

```bash
npm install weco-js
```

## Setting Up and Creating Your First Component

### Step 1: Import Weco JS

Import Weco into your JavaScript file:

```ts
import Weco from 'weco-js';
```

### Step 2: Initialize Weco Instance

Initialize an instance of Weco with any configuration options you need:

```ts
const wecoInstance = new Weco({
    root: document.getElementById('app'),  // Specify the root element
    theme: 'light'                         // Optional theme configuration
});
```

### Step 3: Define a Component

In Weco JS, components are functions that return a JSX-like template and manage their own state. Components rely on `createState` to initialize state and `watchers` to track reactive bindings.

Here’s how to define a simple Counter component:

```tsx
function Counter() {
    const [count, setCount] = wecoInstance.createState(this, 0); // Define component state

    return (
        <div>
            <h1>Count: {count()}</h1>
            <button on:click={() => setCount(count() + 1)}>Increase</button>
        </div>
    );
}
```

### Step 4: Render the Component

Use renderComponent to mount your component to the DOM:

```tsx
wecoInstance.renderComponent(Counter);
```

### Step 5: Working with Reactive Bindings

Weco JS uses watchers to track state-dependent bindings. When the state changes, Weco automatically updates only the affected parts of the UI. For instance:

```tsx
function Message() {
    const [message, setMessage] = wecoInstance.createState(this, "Hello, Weco!");

    return (
        <div>
            <h2>{message()}</h2>
            <button on:click={() => setMessage("You clicked the button!")}>Change Message</button>
        </div>
    );
}

wecoInstance.renderComponent(Message);
```

### Step 6: Leveraging Component Lifecycle Hooks

Weco JS components support lifecycle hooks that allow you to manage component behavior during its lifecycle stages, like when it's added or removed from the DOM.

```tsx
function Timer() {
    const [time, setTime] = wecoInstance.createState(this, 0);

    // Lifecycle hook to start timer when component mounts
    wecoInstance.connectedCallback(this, () => {
        const interval = setInterval(() => {
            setTime(time() + 1);
        }, 1000);

        // Clear interval when component unmounts
        wecoInstance.disconnectedCallback(this, () => clearInterval(interval));
    });

    return <h1>Elapsed Time: {time()} seconds</h1>;
}

wecoInstance.renderComponent(Timer);
```

## Advanced Usage

### Shared State Across Components

Use `createSharedState` to manage data across multiple components. This ensures that changes in shared state are reflected across all dependent components.

```tsx
const [sharedCount, setSharedCount] = wecoInstance.createSharedState(0);

function DisplayCount() {
    return <h2>Shared Count: {sharedCount()}</h2>;
}

function UpdateCountButton() {
    return <button on:click={() => setSharedCount(sharedCount() + 1)}>Increase Shared Count</button>;
}

wecoInstance.renderComponent(DisplayCount);
wecoInstance.renderComponent(UpdateCountButton);
```

### Handling Props

Pass props to components by defining them as function parameters and utilizing them directly in the template:

```tsx
function Greeting({ name }) {
    return <h1>Hello, {name}!</h1>;
}

wecoInstance.renderComponent(() => Greeting({ name: "Weco User" }));
```

## Conclusion

This guide provides a foundation for creating and using Weco JS components with reactive state and lifecycle management. For more complex configurations and additional features, refer to the full documentation.
