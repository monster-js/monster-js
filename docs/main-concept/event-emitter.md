# Event Emitter

The **Event Emitter** in Weco JS is a utility that allows components to communicate by emitting and listening to custom events. This is particularly useful for establishing communication between parent and child components or across different parts of your application.

This documentation provides an overview of how to create and use an event emitter in Weco JS.

## Creating an Event Emitter

In Weco JS, you can create an event emitter by calling `createEventEmitter`. The `createEventEmitter` function returns an object that includes methods for emitting and subscribing to events.

### Example

```ts
// Creating an event emitter
const myEmitter = createEventEmitter();
```

## Emitting Events

To emit an event, use the `emit` method provided by the event emitter. This method takes two arguments:

* **eventName**: The name of the event to emit
* **data**: Optional. Data to pass to the event listener(s) when the event is emitted.

### Example

```ts
// Emit an event called 'userLoggedIn' with some data
myEmitter.emit('userLoggedIn', { userId: 123, username: 'john_doe' });
```

In the example above, the `userLoggedIn` event is emitted with a payload containing user information.

## Listening to Events

To listen for events, use the `on` method, which allows you to subscribe to specific events. The `on` method takes two arguments:

* **eventName**: The name of the event to listen for.
* **listener**: A callback function that will be invoked when the event is emitted. The function receives the data passed by emit as an argument.

### Example

```ts
// Listen for the 'userLoggedIn' event
myEmitter.on('userLoggedIn', (data) => {
    console.log(`User logged in with ID: ${data.userId} and username: ${data.username}`);
});
```

When the `userLoggedIn` event is emitted, the callback function will be executed, receiving the emitted data.

## Removing Event Listeners

To remove a specific event listener, use the `off` method, which unregisters a listener for a particular event. This is useful for cleaning up event listeners, especially in components that are destroyed or unmounted.

### Example

```ts
// Define a listener function
function onUserLoggedIn(data) {
    console.log(`User logged in: ${data.username}`);
}

// Register the listener
myEmitter.on('userLoggedIn', onUserLoggedIn);

// Remove the listener
myEmitter.off('userLoggedIn', onUserLoggedIn);
```

After calling off, the onUserLoggedIn function will no longer be triggered when userLoggedIn is emitted.

## Example Usage in Components

Event emitters are especially helpful in components for handling custom events between parent and child components. Here’s an example of how you might use it in Weco JS:

```tsx
// In a child component
function ChildComponent() {
    const emitter = createEventEmitter();

    const handleClick = () => {
        emitter.emit('childClicked', { message: 'Button clicked in child component' });
    };

    return <button on:click={handleClick()}>Click Me</button>;
}

// In a parent component
function ParentComponent() {
    const childEmitter = createEventEmitter();

    // Listen for the 'childClicked' event
    childEmitter.on('childClicked', (data) => {
        console.log(data.message); // Output: Button clicked in child component
    });

    return <ChildComponent emitter={childEmitter} />;
}
```

In this example:
* The **ChildComponent** emits a `childClicked` event with a message.
* The **ParentComponent** listens to the `childClicked` event from `ChildComponent`.

## Summary

The Event Emitter in Weco JS provides a straightforward way to manage custom events within your application. Here’s a quick summary of the available methods:

* `emit(eventName, data)`: Emit an event with optional data.
* `on(eventName, listener)`: Register a listener for an event.
* `off(eventName, listener)`: Remove a listener for a specific event.

Event emitters are a powerful pattern for communication between components, helping to decouple components and improve code organization.
