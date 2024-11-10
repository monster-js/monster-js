# Conditional Rendering

In the Weco JS framework, conditional rendering allows you to dynamically show or hide elements in your component's UI based on the evaluation of a condition. This is particularly useful for building interactive user interfaces where certain elements are shown or hidden based on user actions or the state of the application.

This guide will explain how to implement conditional rendering using Weco JS's `v:if` directive and state management via the `createState` function.

## Syntax for Conditional Rendering

Weco JS provides a `v:if` directive that allows you to conditionally render HTML elements. The directive works by evaluating an expression or state value. If the expression evaluates to `true`, the element is rendered; if it evaluates to `false`, the element is not rendered or removed.

### Example:

```tsx
function Button() {
    const [show, setShow] = createState(this, true); // Create a state variable 'show' initialized to true

    return <div>
        <button on:click={setShow(!show())}>Show Message</button>
        <p v:if={show()}>Hello world!</p> <!-- Conditionally render the paragraph based on 'show' -->
    </div>
}
```

### Breakdown of the Example:
1. **State Management**:
    * `createState(this, true)` is used to create a reactive state variable called `show` with an initial value of `true`.
    * `setShow` is a function that updates the `show` state. In this case, it toggles the value of `show` when the button is clicked.
2. **Button Click Event**:
    * `<button on:click={setShow(!show())}>` sets up an event listener for the button. When the button is clicked, it toggles the value of `show`. If `show` is `true`, it becomes `false`, and vice versa.
3. **Conditional Rendering (v:if)**:
    * The `<p v:if={show()}>Hello world!</p>` element is conditionally rendered based on the value of `show`.
    * When `show` is `true`, the paragraph with the text "Hello world!" is rendered in the DOM.
    * When `show` is `false`, the paragraph is not rendered, and it is removed from the DOM.

### Detailed Steps:

1. **Create a State**: To manage the conditional rendering, you first need a state variable. Weco JS uses the createState function to manage reactive state variables in components.

```ts
const [state, setState] = createState(this, initialValue);

```

* `state`: The current value of the state.
* `setState`: A function to update the state value.
* `initialValue`: The initial value of the state (can be `true`, `false`, or any value that determines the rendering condition).

2. **Use v:if Directive**: Use the `v:if` directive to conditionally display HTML elements in your component's return statement.

```tsx
<element v:if={condition}>Content</element>
```

* `v:if`: The directive used for conditional rendering.
* `condition`: A boolean expression or state variable that determines whether the element is rendered.

3. **Toggle Rendering**: The `setState` function is used to change the condition for rendering, often in response to user actions, such as clicking a button.

```tsx
<button on:click={setShow(!show())}>Toggle Element</button>
```

## Example of Conditional Rendering with Multiple Elements

You can use conditional rendering with multiple elements to create more complex interfaces.

```tsx
function ToggleComponents() {
    const [showMessage, setShowMessage] = createState(this, false);
    const [showAlert, setShowAlert] = createState(this, true);

    return <div>
        <button on:click={setShowMessage(!showMessage())}>Toggle Message</button>
        <button on:click={setShowAlert(!showAlert())}>Toggle Alert</button>

        <p v:if={showMessage()}>This is a toggled message!</p>
        <div v:if={showAlert()}>This is an alert box!</div>
    </div>
}
```

### Explanation:
* There are two state variables, `showMessage` and `showAlert`, each controlling the visibility of their respective elements.
* The two buttons allow users to toggle the visibility of the paragraph and alert box independently.

## Best Practices

1. **Initial State**: Always initialize the state properly using `createState` to avoid undefined behaviors.
2. **Performance**: Conditional rendering removes elements from the DOM, making it ideal for cases where you want to completely hide an element rather than just hiding it visually (e.g., using CSS `display: none`).
3. **Clear Logic**: Ensure that the logic inside `v:if` is clear and concise. Avoid overcomplicating the condition inside the directive, as this can affect readability and maintainability.