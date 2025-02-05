# Event Handling

In **Monster JS**, event handling is simple and intuitive, allowing you to define event listeners directly within your component's JSX. You can attach events, capture event data, reference the clicked element, and perform actions—all directly in the event handler.

## Basic Event Handling

To handle events, define an event listener function in your component and assign it to the appropriate event using the `on:<event>` syntax.

### Example

```tsx
export function ButtonComponent() {
    const onClick = () => {
        console.log('hello world');
    };
    return <button on:click={onClick()}>Click Me</button>;
}
```

In this example:

* The `onClick` function is defined to log "hello world" to the console.
* The event is bound to the button's `click` event using `on:click`.

## Accessing Event and Element Information

You can also access both the event object and the clicked element within the event handler. Use `$event` and `$element` placeholders to pass the event and element as arguments.

### Example

```tsx
declare const $event: any;
declare const $element: any;

export function ButtonComponent() {
    const onClick = (event, element) => {
        console.log('I am the event', event);
        console.log('I am the clicked element', element);
    };
    return <button on:click={onClick($event, $element)}>Click Me</button>;
}
```

In this example:

* `onClick` is called with `$event` and `$element`, providing direct access to both the `event` and the `element` that triggered it.
* This allows you to perform more complex operations or log details about the click.

## Direct Operations in Event Handlers

Monster JS also allows you to perform direct operations or state updates directly in the event handler without a separate function.

### Example

```tsx
export function ButtonComponent() {
    const [count, setCount] = createState(this, 0);

    return <button on:click={setCount(count() + 1)}>Increment</button>;
}
```

In this example:

* `setCount(count() + 1)` directly updates the count each time the button is clicked.
* This concise approach is useful for simple actions where defining a separate function may not be necessary.

## Summary

Monster JS's event handling system provides flexible options:

* **Define separate event handler functions** and assign them to events.
* **Capture event and element information** using `$event` and `$element` for more control.
* **Directly perform operations** within the event attribute for concise and inline updates.

With these methods, Monster JS makes it straightforward to add interactivity to your components.
