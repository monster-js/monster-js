# Event Emitter

The Event Emitter in **Monster JS** is a utility for creating and handling custom events, facilitating communication between components. It is particularly useful for managing interactions between parent and child components or for global application-level events.

This documentation explains how to create and use both standard and feature-specific event emitters in Monster JS.

## Creating an Event Emitter

You can create a standard event emitter using the `createEventEmitter` function. This function provides methods to emit, listen, and unsubscribe from events.

### Example

```ts
import { createEventEmitter } from "monster-js";

export const myEmitter = createEventEmitter();
```

## Emitting Events

To emit an event, use the `emit` method. It takes two arguments:

1. `eventName`: Name of the event.
2. `data` (optional): Data to pass to listeners when the event is emitted.

### Example

```ts
myEmitter.emit('userLoggedIn', { username: 'john_doe' });
```

## Listening to Events

Use the `on` method to register a listener for specific events. The listener is a callback function invoked when the event is emitted.

### Example

```ts
myEmitter.on('userLoggedIn', (data) => {
    console.log(`User logged in: ${data.username}`);
});
```

## Removing Event Listeners

To remove a specific listener, use the `off` method. This ensures proper cleanup of listeners, especially for components that are destroyed or unmounted.

### Example

```tsx
function App() {

    const onUserLoggedIn = (data) => {
        console.log(`User logged in: ${data.username}`);
    }

    myEmitter.on('userLoggedIn', onUserLoggedIn);

    disconnected(() => {
        myEmitter.off('userLoggedIn', onUserLoggedIn);
    });

    return <h1>App</h1>
}
```

## Feature-Specific Event Emitters

Monster JS allows you to create **feature event emitters** using the `createFeatureEventEmitter` function. These emitters are designed to handle events related to specific features, simplifying event management for focused functionality.

## Creating a Feature Event Emitter

Use `createFeatureEventEmitter` to define a feature-specific event emitter:

```ts
export const onExpandSidebar = createFeatureEventEmitter('onExpandSidebar');
```

## Using a Feature Event Emitter

### Example 1: Emitting Events

```tsx
function Component() {
    const handleClick = () => {
        onExpandSidebar.emit(true);
    };

    return <button on:click={handleClick()}>Expand sidebar</button>;
}
```

In this example:
* The `onExpandSidebar` emitter emits an event with a `true` value when the button is clicked.

### Example 2: Listening for Events

```tsx
function SidebarComponent() {
    const [expand, setExpand] = createState(this, false);

    onExpandSidebar.on((value) => {
        setExpand(value);
    });

    return <div class={expand() ? 'expanded' : ''}>...</div>;
}
```

Here:
* The `SidebarComponent` listens for events from onExpandSidebar.
* The `expand` state is updated dynamically based on the event value.

## Example Usage in Components

Combining standard and feature-specific emitters makes communication between components seamless.

### Standard Event Emitter

```tsx
function ChildComponent() {
    const myEmitter = createEventEmitter();

    const handleClick = () => {
        myEmitter.emit('childClicked', { message: 'Child clicked' });
    };

    return <button on:click={handleClick()}>Click Me</button>;
}

function ParentComponent() {
    const myEmitter = createEventEmitter();

    myEmitter.on('childClicked', (data) => {
        console.log(data.message);
    });

    return <ChildComponent />;
}
```

### Feature Event Emitter

```tsx
export const onToggleTheme = createFeatureEventEmitter('onToggleTheme');

function ThemeToggleButton() {
    const handleToggle = () => {
        onToggleTheme.emit('dark');
    };

    return <button on:click={handleToggle()}>Toggle Theme</button>;
}

function ThemeDisplay() {
    const [theme, setTheme] = createState(this, 'light');

    onToggleTheme.on((newTheme) => {
        setTheme(newTheme);
    });

    return <p>Current theme: {theme()}</p>;
}
```

## Summary

Event emitters in Monster JS offer a powerful way to manage custom events, whether globally or feature-specifically.

### Key Methods:

1. `emit(eventName, data)`: Emit an event with optional data.
2. `on(eventName, listener)`: Register a listener for an event.
3. `off(eventName, listener)`: Remove a registered listener.
4. `clear(eventName)`: Remove all registered listener.

### Feature Event Emitters:

* Allow you to organize events by feature.
* Simplify communication for specific functionalities.

By combining standard and feature-specific emitters, you can create highly modular and maintainable components.

