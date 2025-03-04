# Directives

Directives in **Monster JS** enable you to encapsulate reusable logic that can dynamically modify or enhance the behavior of elements in your components. They provide a clean and modular way to apply specific functionality or styling to elements by defining, registering, and applying directive functions.

## Defining a Directive

To create a directive, use the `directive` function from `monster-js`. The function requires two parameters:
1. **Logic function**: A function that defines how the directive modifies an element.
2. **Namespace**: A unique identifier used to apply the directive to elements.

### Basic Example

The following `highlight` directive changes an element's background color:

```tsx
import { directive, DirectiveDataType } from 'monster-js';

function highlight(element: Element, data: DirectiveDataType, originalElement: Element) {
    const color = Object.keys(data)[0];
    return <div style={`background: ${color};`}>
        <element-outlet element={element} />
    </div>;
}

export default directive(highlight, 'highlight');
```

#### Parameters Explained

* `element`: The current element being modified by the directive. This could be the original element or an element modified by previous directives if multiple directives are applied in sequence.
* `data`: Contains the directive-specific data, such as values passed with the namespace.
* `originalElement`: The element to which the directive was initially applied.
* `<element-outlet>`: Re-inserts an element into the directive's ui.

## Using Directives in Components

### Applying the `highlight` Directive

To use the `highlight` directive in a component:

```tsx
import { component } from 'monster-js';
import highlight from './highlight.directive';

export default function App() {
    return <p>Welcome, <span highlight:red>John</span>!</p>;
}

component(App, {
    selector: 'app-root',
    directives: [highlight]
});
```

#### Explanation
* `highlight:red`: The `highlight` directive applies a red background to the `<span>` element.

## Dynamic Value Directives

Directives can also adapt their behavior based on dynamic values. Below is an example:

```tsx
import { directive, DirectiveDataType } from 'monster-js';

function highlight(element: Element, data: DirectiveDataType) {
    return (
        <div style={`background: ${data.color()};`}>
            <element-outlet element={element} />
        </div>
    );
}

export default directive(highlight, 'highlight');
```

### Explanation
* The directive accesses `data.color()`, a function that provides a dynamic value.
* This makes the directive highly flexible for reactive UI updates.

### Usage with Dynamic State

Here's how to integrate a dynamic directive into a component:

```tsx
import { component, createState } from 'monster-js';
import highlight from './highlight.directive';

export function App() {
    const [color] = createState(this, 'blue'); // Reactive state for color

    return <p>Welcome, <span highlight:color={color()}>John</span>!</p>;
}

component(App, {
    selector: 'app-root',
    directives: [highlight]
});
```

#### Explanation
* `highlight:color={color()}`: The directive dynamically updates the background color based on the `color` state.

## Registering Directives

Directives must be registered in the component where they are used. Use the `directives` property of the `component` function to register them.

```tsx
component(App, {
    selector: 'app-root',
    directives: [highlight]
});
```

## Summary

Directives in **Monster JS** offer:

* **Flexibility**: Encapsulate reusable logic for element-specific behavior.
* **Dynamic Behavior**: Adapt to reactive state values for greater interactivity.
* **Ease of Use**: Simple registration and application in components.

By leveraging static and dynamic directives, you can create powerful, reusable, and maintainable UI enhancements in your **Monster JS** projects.
