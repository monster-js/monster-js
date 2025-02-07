# Observed Attributes

In Monster JS, observed attributes allow you to track specific attribute changes on a component. When an observed attribute's value changes, the `attributeChanged` or `namedAttrChanged` hooks can respond to that change, enabling dynamic updates to the component based on attribute values. These hooks are part of Monster JS's lifecycle system, providing fine-grained control over how attribute changes are handled.

## Defining Observed Attributes

To observe attributes on a component, specify them in the `component` function under the `observedAttributes` option. Below is an example of a `CounterComponent` component that observes the `count` attribute.

### Example: Counter Component with Observed Attribute

```tsx
export function CounterComponent() {
    const [count, setCount] = createState(this, 0);

    // Using the `attributeChanged` hook to handle attribute changes
    attributeChanged(this, (attrName, oldVal, newVal) => {
        if (attrName === 'count') {
            setCount(Number(newVal));
        }
    });

    return <div>Count: {count()}</div>;
}

// Register the component with the observed attribute
component(CounterComponent, {
    selector: 'app-counter',
    observedAttributes: ['count']
});
```

In this example:
* The `attributeChanged` hook is triggered whenever an observed attribute (in this case, `count`) changes.
* The hook checks if the changed attribute is `count` and, if so, converts the new value to a number and updates the component’s state.

## Observing a Single Attribute with `namedAttrChanged`

For simpler use cases, the `namedAttrChanged` hook is a streamlined alternative to `attributeChanged`. It directly observes a specific attribute, optionally applying transformations to the new value.

### Example: Observing a Single Attribute

```tsx
export function CounterComponent() {
    const [count, setCount] = createState(this, 0);

    // Observing the `count` attribute with `namedAttrChanged`
    namedAttrChanged(this, 'count', (newVal, oldVal) => {
        setCount(+newVal);
    });

    return <div>Count: {count()}</div>;
}

// Register the component
component(CounterComponent, {
    selector: 'app-counter',
    observedAttributes: ['count']
});
```

In this example:
* The `namedAttrChanged` hook simplifies the code by focusing solely on the `count` attribute.
* No additional logic is needed to check the attribute name inside the callback.

## Adding Transformers with `namedAttrChanged`

The `namedAttrChanged` hook supports transformers to process attribute values before passing them to the handler. This feature is useful when dealing with specific data types.

### Example: Using a Transformer

```tsx
export function CounterComponent() {
    const [isActive, setIsActive] = createState(this, false);

    // Observing the `is-active` attribute as a boolean
    namedAttrChanged(this, 'is-active', (newVal, oldVal) => {
        setIsActive(newVal);
    }, [toBoolean]);

    return <div>Status: {isActive() ? 'Active' : 'Inactive'}</div>;
}

// Register the component
component(CounterComponent, {
    selector: 'app-counter',
    observedAttributes: ['is-active']
});
```

In this example:
* The `toBoolean` ensures the `is-active` attribute is interpreted as a boolean (`true` or `false`).

## Creating Transformers

Transformers in Monster JS are simple functions that accept a value, process it, and return the transformed value. They can be chained in an array to apply multiple transformations to an attribute value before it reaches the handler function.

### Defining a Transformer

A transformer is just a standard function:

```tsx
function toUpperCase(value) {
    return String(value).toUpperCase();
}
```

### Using Transformers with `namedAttrChanged`

You can pass an array of transformers to `namedAttrChanged`. Each transformer in the array processes the value sequentially before it is passed to the handler.

```tsx
export function Component() {
    namedAttrChanged(this, 'username', (newVal, oldVal) => {
        console.log(`Transformed value: ${newVal}`);
    }, [
        (value) => value.trim(), // Remove extra spaces
        (value) => value.toLowerCase(), // Convert to lowercase
        toUpperCase // Custom transformer
    ]);

    return <h1>Hello world!</h1>;
}
```

In this example:
1. The first transformer removes extra spaces from the attribute value.
2. The second transformer converts the value to lowercase.
3. The `toUpperCase` transformer then converts the value to uppercase.

### Common Transformers

Here are some frequently used transformers:
1. `toNumber`: Converts the input value into a number..
2. `toBoolean`: Converts the input value into a boolean. Returns `false` for `undefined`, `null`, `false`, `"false"`, or `""`, and `true` otherwise.
3. `toJsonObject`: Parses the input string as a JSON object.

### Combining Transformers

Transformers can be combined to handle complex scenarios:

```tsx
function Component() {
    namedAttrChanged(this, 'config', (newVal, oldVal) => {
        console.log(`Parsed JSON:`, newVal);
    }, [
        (value) => value.trim(),
        toJsonObject // Parse the cleaned JSON string
    ]);

    return <h1>Hello world!</h1>;
}
```

By defining and using transformers, you can easily customize how attribute values are processed and ensure they are correctly formatted for your component logic.

## Using a Component with Observed Attributes

Let’s demonstrate the usage of a component with observed attributes in a parent component. Here, the `CounterComponent` component is integrated with a dynamic `count` value.

### Example: Parent Component

```tsx
function App() {
    const [clickCount, setClickCount] = createState(this, 0);

    const incrementCount = () => {
        setClickCount(clickCount() + 1);
    };

    return (
        <div>
            <button on:click={incrementCount}>Increase Count</button>
            <CounterComponent count={clickCount()} />
        </div>
    );
}
```

### Example: Count Component

```tsx
function CounterComponent() {
    const [count, setCount] = createState(this, 0);

    attributeChanged(this, (attrName, oldVal, newVal) => {
        if (attrName === 'count') {
            setCount(Number(newVal));
        }
    });

    return <h1>Count: {count()}</h1>
}

component(CounterComponent, {
    selector: 'app-counter',
    observedAttributes: ['count']
});
```

In this example:
* The `App` component contains a button that increments a `clickCount` state.
* The `CounterComponent` component observes the `count` attribute, updating its display dynamically as the `clickCount` state changes in the parent.

## Key Points
* **Specifying Observed Attributes**: Define observed attributes in the `observedAttributes` array when registering a component.
* **Reacting to Changes**: Use the `attributeChanged` hook to handle multiple attributes or `namedAttrChanged` for single attributes.
* **Transforming Attribute Values**: Leverage transformers like `toBoolean`, `toNumber`, or `toJsonObject` with `namedAttrChanged` to process attribute values automatically.
* **Lifecycle Hooks Integration**: The `attributeChanged` and `namedAttrChanged` hooks are part of Monster JS's robust lifecycle system, making it easy to manage dynamic component behavior efficiently.

By leveraging Monster JS's observed attributes and lifecycle hooks, you can create components that dynamically respond to attribute changes, enabling powerful and reactive application designs.
