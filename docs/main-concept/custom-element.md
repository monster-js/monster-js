# Custom Element

The Monster JS framework allows you to create custom elements by extending built-in HTML elements, making it simple to integrate reusable and customizable components into your application.

## Creating a Custom Element Component

To create a custom element component, you need to add the `extends` property in the component configuration.

```tsx
import { component } from 'monster-js';

export function ButtonComponent() {
    return <span>ButtonComponent</span>;
}

component(ButtonComponent, {
    selector: 'app-button',
    extends: [HTMLButtonElement, 'button'], // Extend the <button> element
});
```

* The `extends` property takes an array with two values:
    1. The class to extend (e.g., `HTMLButtonElement`).
    2. The tag name of the built-in element being extended (e.g., `'button'`).

## Using the Custom Element

After defining the component, you can use it in your HTML like this:

```tsx
<ButtonComponent />
```

It will create an element like this

```tsx
<button is="app-button">
    <span>ButtonComponent</span>
</button>
```

## Summary

To create and use a custom element in Monster JS:

1. Define the component with the `extends` property to specify the built-in element.
2. Use the custom element in your HTML directly as a JSX component.

By following these steps, you can seamlessly integrate custom elements into your Monster JS application while maintaining clean and reusable code.
