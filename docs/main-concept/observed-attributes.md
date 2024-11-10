# Observed Attributes

In Weco JS, observed attributes allow you to track specific attribute changes on a component. When an observed attribute's value changes, the `attributeChanged` or `namedAttrChanged` hooks can respond to that change, enabling dynamic updates to the component based on attribute values.

## Defining Observed Attributes

To observe attributes on a component, specify them in the `registerConfig` function under `observedAttributes`. Below is an example of a `Counter` component that observes the `count` attribute.

### Example: Counter Component with Observed Attribute

```tsx
function Counter() {
    const [count, setCount] = createState(this, 0);

    const toNumber = (countStr) => +countStr;

    attributeChanged(this, (attrName, oldVal, newVal) => {
        if (attrName === 'count') {
            setCount(toNumber(newVal));
        }
    });

    return <div>Count: {count()}</div>;
}

// Register the component with the observed attribute
registerConfig(Counter, {
    observedAttributes: ['count']
});
```

In this example, whenever the `count` attribute changes, the `attributeChanged` hook is triggered. It checks if the changed attribute is `count`, and if so, converts the new value to a number and updates the component’s state accordingly.

## Observing a Single Attribute with `namedAttrChanged`

For simpler cases, you can observe a single attribute directly by using the `namedAttrChanged` hook. This allows you to monitor a specific attribute without needing to check for its name within the `attributeChanged` hook.

```ts
namedAttrChanged(this, 'count', (newVal, oldVal) => {
    setCount(toNumber(newVal));
});
```

## Using a Component with Observed Attributes

To demonstrate the use of the `Counter` component with an observed attribute, we’ll create a parent component that passes a dynamic `count` value to `Counter` as an attribute.

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
            <Counter count={clickCount()} />
        </div>
    );
}
```

In this example:

* The `App` component contains a button that increments a `clickCount` state each time it’s clicked.
* The `Counter` component is used with the `count` attribute set to `clickCount()`—the current value of `clickCount`.
* As `clickCount` changes, `Counter` receives the updated `count` attribute, triggering the `attributeChanged` hook to update the displayed count.

## Key Points

* Use `observedAttributes` in `registerConfig` to specify which attributes to monitor.
* `attributeChanged` responds to all observed attributes, allowing you to react to multiple changes in a single hook.
* `namedAttrChanged` simplifies observing single attributes and is an alternative to `attributeChanged`.

By following these steps, Weco JS components can efficiently track and respond to attribute changes for reactive, data-driven behavior.
