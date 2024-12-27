# Child to parent (data flow)

In Weco JS, the "child to parent" data flow allows a child component to send data back to its parent component. This is achieved by passing a callback function from the parent to the child as a prop. When the child component calls this function, it can pass data as a parameter, enabling the parent to receive and handle the data.

This approach is useful for scenarios where child components need to communicate events, updates, or values back to the parent.

## Example: Passing Data from Child to Parent

Here's how you can set up a child-to-parent data flow in Weco JS using a callback function.

### Parent Component

In the parent component, define a callback function that takes a parameter (data from the child). Then, pass this function as a prop to the child component.

```tsx
function ParentComponent() {
    const [message, setMessage] = createState(this, '');

    const handleMessageUpdate = (newMessage) => {
        setMessage(newMessage);
    };

    return (
        <div>
            <ChildComponent prop:onUpdateMessage={handleMessageUpdate} />
            <p>Message from child: {message()}</p>
        </div>
    );
}
```

In this example:

* `handleMessageUpdate` is the callback function passed to the child component via the `prop:onUpdateMessage` prop.
* `setMessage` updates the parent’s state with data received from the child.

### Child Component

In the child component, receive the callback function as a prop and invoke it, passing the desired data to the parent.

```tsx
function ChildComponent() {
    const props = createProps(this);

    const sendMessage = () => {
        props().onUpdateMessage("Hello from Child!");
    };

    return <button on:click={sendMessage()}>Send Message to Parent</button>;
}
```

In this example:

* The child component uses `props().onUpdateMessage` to access the `onUpdateMessage` prop and calls it with `"Hello from Child!"` as the argument, passing data back to the parent.

## Summary

In Weco JS, passing data from a child component to a parent component can be easily achieved by:

* Defining a callback function in the parent component to handle data.
* Passing the callback function to the child component as a prop.
* Invoking the callback in the child component, with the necessary data as an argument, to send data back to the parent.

This approach allows dynamic, two-way data communication and is a powerful pattern for creating interactive and responsive components.
