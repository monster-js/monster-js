# Lifecycle Hooks

In Monster JS, lifecycle hooks let you execute specific logic at different stages of a component's lifecycle, such as when it’s connected to, disconnected from, or moved between documents, or when an attribute changes. These hooks are useful for managing setup, cleanup, and attribute changes within your components.

## Available Lifecycle Hooks

### `connected`

The `connected` hook runs when the component is connected to the DOM. It is similar to the `connectedCallback` in native Web Components and is ideal for performing initialization tasks, like setting up event listeners or data fetching.

#### Usage

```tsx
function Component() {
    connected(this, () => {
        console.log('connectedCallback');
    });

    return <h1>Hello world!</h1>;
}
```

In this example:

* The `connected` hook logs "connectedCallback" to the console when the component is attached to the DOM.

### `afterViewInit`

The `afterViewInit` hook runs after the connected hook and after the initial change detection has completed. It is useful for executing logic that depends on the complete rendering of the component's view.

#### Usage

```tsx
function Component() {
    afterViewInit(this, () => {
        console.log('afterViewInit - View is fully initialized');
    });

    return <h1>Hello world!</h1>;
}
```

In this example:
* The `afterViewInit` hook logs "afterViewInit - View is fully initialized" to the console after the component is attached to the DOM and its view has been rendered and initialized.

### `disconnected`

The `disconnected` hook runs when the component is removed from the DOM. It functions similarly to the `disconnectedCallback` in native Web Components and is useful for cleanup tasks like removing event listeners or canceling subscriptions.

#### Usage

```tsx
function Component() {
    disconnected(this, () => {
        console.log('disconnectedCallback');
    });

    return <h1>Hello world!</h1>;
}
```

In this example:

* The `disconnected` hook logs "disconnectedCallback" to the console when the component is detached from the DOM.

### `adopted`

The `adopted` hook runs when the component is moved to a new document, like when a component is moved from one iframe to another. This is similar to the `adoptedCallback` in native Web Components.

#### Usage

```tsx
function Component() {
    adopted(this, () => {
        console.log('adoptedCallback');
    });

    return <h1>Hello world!</h1>;
}
```

In this example:

* The `adopted` hook logs "adoptedCallback" to the console whenever the component is moved to a new document.

### `attributeChanged`

The `attributeChanged` hook fires whenever a specified attribute on the component changes. This is similar to attributeChangedCallback in native Web Components and is helpful for responding to changes in attribute values. This hook is related to observed attributes, which are attributes the component specifically "observes" for changes. For more information on observed attributes, please check this documentation link about [observed attributes](/main-concept/observed-attributes.md).

#### Usage

```tsx
function Component() {
    attributeChanged(this, (attrName, oldVal, newVal) => {
        console.log(`attributeChangedCallback: ${attrName} - ${oldVal} - ${newVal}`);
    });

    return <h1>Hello world!</h1>;
}

component(Component, {
    selector: 'app-component',
    observedAttributes: ['data-name']
});

```

In this example:
* The `attributeChanged` hook is called whenever one of the specified attributes in the `observedAttributes` array changes from the parent component.

### `namedAttrChanged`

If you need to observe specific attributes, use `namedAttrChanged`. This hook can also transform the attribute value before passing it to the handler function.

#### Usage

```tsx
function Component() {
    // Watching a specific attribute
    namedAttrChanged(this, 'data-name', (newVal, oldVal) => {
        console.log(`attributeChangedCallback for data-name attribute: ${newVal} - ${oldVal}`);
    });

    return <h1>Hello world!</h1>;
}

component(Component, {
    selector: 'app-component',
    observedAttributes: ['data-name']
});
```

### Using Transformers with `namedAttrChanged`

Monster JS provides several transformers for `namedAttrChanged` to handle common data types:

* `toNumber`: Converts the attribute value to a number.
* `toBoolean`: Converts the attribute value to a boolean.
* `toJsonObject`: Parses the attribute value as JSON.

#### Example with Transformer

```tsx
function Component() {
    namedAttrChanged(this, 'is-admin', (newVal, oldVal) => {
        console.log(`attributeChangedCallback for is-admin attribute: ${newVal} - ${oldVal}`);
    }, [toBoolean]);

    return <h1>Hello world!</h1>;
}
```

In this example:
* The `namedAttrChanged` hook specifically watches the `is-admin` attribute.
* The `toBoolean` converts `is-admin` to a boolean (`true` or `false`), ensuring that the handler receives values in the correct type.

## Full Example

Here’s an example demonstrating how to use all hooks in a single component:

```tsx
function Component() {
    connected(this, () => {
        console.log('connectedCallback');
    });

    afterViewInit(this, () => {
        console.log('afterViewInit - View is fully initialized');
    });

    disconnected(this, () => {
        console.log('disconnectedCallback');
    });

    adopted(this, () => {
        console.log('adoptedCallback');
    });

    attributeChanged(this, (attrName, oldVal, newVal) => {
        console.log(`attributeChangedCallback: ${attrName} - ${oldVal} - ${newVal}`);
    });

    namedAttrChanged(this, 'data-value', (newVal, oldVal) => {
        console.log(`attributeChangedCallback for data-value: ${newVal} - ${oldVal}`);
    }, [toNumber]);

    return <h1>Hello world!</h1>;
}
```

In this example:

* The `connected` hook runs when the component is added to the DOM.
* The `afterViewInit` hook runs after connected hook and initial change detection.
* The `disconnected` hook runs when the component is removed from the DOM.
* The `adopted` hook runs when the component is moved to a new document.
* The `attributeChanged` hook runs whenever a specified attribute changes.
* The `namedAttrChanged` hook runs whenever a single specified attribute changes.

## Summary

Monster JS lifecycle hooks allow you to tap into various stages of a component's lifecycle:

* `connected`: Triggered when the component is connected to the DOM.
* `afterViewInit`: Triggered after the view has been fully initialized and change detection has run.
* `disconnected`: Triggered when the component is disconnected from the DOM.
* `adopted`: Triggered when the component is moved to a different document.
* `attributeChanged`: Triggered whenever an observed attribute on the component changes.
* `namedAttrChanged`: Observes changes on a specific attribute, with optional transformations using `toNumber`, `toBoolean`, or `toJsonObject`.

Using these hooks, you can handle initialization, cleanup, document transfer, and attribute updates efficiently, providing greater control over component behavior throughout its lifecycle.
