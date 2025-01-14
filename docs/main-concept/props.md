# Props

In Monster JS, **props** are a way to pass any data type from a parent component to a child component. This allows for flexible and reusable components, enabling the parent to customize the behavior and display of its children based on dynamic data. However, it is important to note that props can only be used if both the parent and child components are within the same Monster JS project.

## Passing Props from Parent to Child

To pass props to a child component, you can use the following syntax in the parent component’s JSX:

```tsx
<Counter prop:count={count()} />
```

In this example, `count()` is a reactive state variable defined in the parent component, and `prop:count` is the prop being passed to the `Counter` child component.

### Example: Using Props

Here’s a complete example demonstrating how to use props in Monster JS.

#### Step 1: Parent Component

In the parent component, you manage a count state variable and pass it to the `Counter` child component.

```tsx
function App() {
    const [count, setCount] = createState(this, 0);
    const [status, setStatus] = createState(this, 'active');

    const incrementCount = () => {
        setCount(count() + 1);
    };

    const toggleStatus = () => {
        setStatus(status() === 'active' ? 'inactive' : 'active');
    };

    return (
        <div>
            <button on:click={incrementCount()}>Increase Count</button>
            <button on:click={toggleStatus()}>Toggle Status</button>
            <Counter prop:count={count()} prop:status={status()} />
        </div>
    );
}
```

In this setup(for count state):

* `createState(this, 0)` initializes the count state variable in the parent component.
* The `incrementCount` function increments the count when the button is clicked.
* The `Counter` component receives the current count value as a prop using `prop:count={count()}`.

#### Step 2: Child Component

In the child component, you can access the passed props using the `createProps` function or by specifying a single prop directly.

##### Accessing Multiple Props

```tsx
function Counter() {
    const props = createProps(this);

    return (
        <div>
            Count: {props().count}
            <br />
            Status: {props().status}
        </div>
    );
}
```

##### Using `createProp` for a Single Prop

If you only need to access a single prop, you can use `createProp`:

```tsx
function Counter() {
    const count = createProp(this, 'count');
    const status = createProp(this, 'status');

    return (
        <div>
            Count: {count()}
            <br />
            Status: {status()}
        </div>
    );
}
```

## Key Points

* **Syntax**: Use the `prop:` prefix to pass props from the parent component to the child component.
* **Accessing Props**:
    * Use `createProps(this)` to retrieve all props as an object.
    * Use `createProp(this, 'prop-name')` to access a specific prop directly.
* **Reactive Updates**: If the parent’s state changes, the child component will automatically reflect those changes in the displayed props due to Monster JS’s reactive nature.

## Benefits of Using Props

* **Decoupling**: Props allow components to be decoupled and reusable. The child component does not need to know about the parent’s internal state.
* **Dynamic Behavior**: You can easily customize child components by passing different props from the parent, enabling dynamic user interfaces.
* **Maintainability**: Using props simplifies the flow of data through your components, making your code more maintainable and easier to understand.

By leveraging props in Monster JS, you can create flexible and reusable components that can easily share data, leading to a more dynamic and interactive application.
