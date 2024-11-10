# Data Binding

Data binding in **Weco JS** enables dynamic updates between the user interface and application data, allowing UI elements to reflect the latest state and respond to user interactions.
Weco JS supports **two-way data binding** through a combination of states and event handlers, making it easy to create responsive web components.

## Basic Usage of Data Binding

In Weco JS, data binding is achieved by creating a state variable that tracks the data's value and provides a method to update it. This allows components to automatically update the UI whenever the state changes.

### Example: Simple Data Binding with a Counter

The following example demonstrates a simple counter component with two-way data binding in Weco JS:

```tsx
function ButtonDataBinding() {
    const [count, setCount] = createState(this, 0); // Initialize state with 0

    const onClick = () => {
        setCount(count() + 1); // Update state on button click
    }

    return <div>
        <button on:click={onClick}>Increment</button> <!-- Attach event to update state -->
        <p>Count: {count()}</p> <!-- Display current count value -->
    </div>
}
```

#### Explanation

* **State Creation**: The `createState(this, initialValue)` function creates a reactive state variable. Here, `count` is the getter of the state variable, initialized with a value of `0`, and `setCount` is the setter function.
* **Reading the State**: To access the current value of the state, call `count()`. This reactive function updates the component UI automatically whenever `count` changes.
* **Updating the State**: The `setCount` function updates the state. When called, it triggers an update in the UI to reflect the new state.
* **Event Binding**: The `on:click` attribute attaches an event listener to the button, triggering the `onClick` function when clicked. This function increments the count by calling `setCount(count() + 1)`.

## Data Binding with Input Elements

Weco JS also supports data binding with input elements, allowing two-way binding where user input updates the component's state, which then reflects in the UI.

```tsx
function NameInput() {
    const [name, setName] = createState(this, "");

    const onInput = (event) => {
        setName(event.target.value); // Update state with user input
    };

    return <div>
        <input type="text" on:input={onInput($event)} value={name()} placeholder="Enter your name" />
        <p>Your name: {name()}</p>
    </div>
}
```

In this example:

* **State Binding**: The `name` state variable is bound to the `<input>` value attribute.
* **Event Handling**: The `on:input` event updates the `name` state whenever the user types in the input field.
* The `p` element displays the current value of `name`, updating as the state changes.

## Summary

Weco JS data binding offers:
* **Reactive State**: Created with `createState()`, allowing components to automatically reflect data changes.
* **Two-Way Binding**: Achieved through state setters and event listeners, letting user interactions update the state.
* **Automatic UI Updates**: Ensures that UI components reflect the latest state, keeping your application dynamic and responsive.

This structure allows developers to create components that efficiently manage and reflect state changes in the user interface.
