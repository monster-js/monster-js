# Two-Way Binding

Two-way binding in Monster JS simplifies synchronization between the model (state) and the view (UI components). This ensures that changes in the UI automatically update the model and vice versa.

## How It Works

Monster JS provides a declarative syntax using the `v:model` directive, which binds a piece of state to an input element. This enables:

1. **Model → View**: The value of the model updates the UI.
2. **View → Model**: Changes in the input element update the model.

## Syntax

```tsx
<input type="text" v:model={[state, setState]} />
```   

### Parameters

* **state**: A getter function for the current value of the state.
* **setState**: A setter function to update the value of the state.

## Example: Name Input Component

Below is a simple implementation of a two-way binding example:

### Code

```tsx
export function NameInputComponent() {
    // Define state for the name
    const [name, setName] = createState(this, "");

    return (
        <div>
            <input type="text" v:model={[name, setName]} />
            <p>Your name: {name()}</p>
        </div>
    );
}
```

### Explanation

1. **State Initialization**:
    * `createState(this, "")` creates a reactive state, where `name` is the getter and `setName` is the setter.
2. **Input Binding**:
    * The `v:model={[name, setName]}` ensures two-way binding between the `<input>` and the `name` state.
3. **Dynamic Updates**:
    * Typing into the input updates the `name` state, and any changes to the `name` state reflect in the `<p>` element.

## Supported Input Elements

The `v:model` directive works with the following HTML elements:

1. **Text-Based Inputs**:

```tsx
<input type="text" v:model={[state, setState]} />
<input type="password" v:model={[state, setState]} />
<input type="email" v:model={[state, setState]} />
<input type="search" v:model={[state, setState]} />
```

2. **Checkboxes**:

```tsx
<input type="checkbox" v:model={[checked, setChecked]} />
```

3. **Radio Buttons**:

```tsx
<input type="radio" name="option" value="A" v:model={[selected, setSelected]} />
```

4. **Select Dropdowns**:

```tsx
<select v:model={[selectedOption, setSelectedOption]}>
    <option value="Option1">Option 1</option>
    <option value="Option2">Option 2</option>
</select>
```

5. **Textareas**:

```tsx
<textarea v:model={[description, setDescription]}></textarea>
```

## Advanced Examples

### Example 1: Binding Multiple Inputs

```tsx
export function UserFormComponent() {
    const [firstName, setFirstName] = createState(this, "");
    const [lastName, setLastName] = createState(this, "");

    return (
        <div>
            <input type="text" v:model={[firstName, setFirstName]} placeholder="First Name" />
            <input type="text" v:model={[lastName, setLastName]} placeholder="Last Name" />
            <p>Full Name: {firstName()} {lastName()}</p>
        </div>
    );
}
```

### Example 2: Checkbox Binding

```tsx
export function AcceptTermsComponent() {
    const [accepted, setAccepted] = createState(this, false);

    return (
        <div>
            <input type="checkbox" v:model={[accepted, setAccepted]} />
            <p>{accepted() ? "Terms Accepted" : "Please accept the terms."}</p>
        </div>
    );
}
```

### Example 3: Select Dropdown Binding

```tsx
export function DropdownComponent() {
    const [selectedOption, setSelectedOption] = createState(this, "");

    return (
        <div>
            <select v:model={[selectedOption, setSelectedOption]}>
                <option value="Option1">Option 1</option>
                <option value="Option2">Option 2</option>
                <option value="Option3">Option 3</option>
            </select>
            <p>Selected: {selectedOption()}</p>
        </div>
    );
}
```

## Key Benefits

1. Declarative Syntax: Simple and clean syntax for binding state to inputs.
2. Automatic Synchronization: No need to manually handle events like `onChange` or `onInput`.
3. Reactivity: The UI automatically updates when the state changes.

## Best Practices

1. Use `v:model` for form elements to reduce boilerplate code.
2. Keep state logic centralized by using `createState`.
3. Combine two-way binding with validation logic to enhance user experience.

By using `v:model`, Monster JS makes it easy to manage state and UI interactions for form elements, ensuring a seamless and reactive user experience.