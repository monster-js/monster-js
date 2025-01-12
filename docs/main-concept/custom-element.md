# Custom Element

The Weco JS framework allows you to create custom elements by extending built-in HTML elements, making it simple to integrate reusable and customizable components into your application.

## Creating a Custom Element Component

To create a custom element component, you need to:

1. Define the component function.
2. Add the `extends` property in the component configuration.

```tsx
import { component } from 'weco-js';

export function ButtonComponent() {
    return <span>ButtonComponent</span>;
}

component(ButtonComponent, {
    selector: 'app-button',
    extends: [HTMLButtonElement, 'button'], // Extend the <button> element
});
```

* `extends` Property
    * The `extends` property takes an array with two values:
        1. The class to extend (e.g., `HTMLButtonElement`).
        2. The tag name of the built-in element being extended (e.g., `'button'`).

## Defining the Custom Element

You must define the custom element using the `defineComponent` function before using it in your application. For example:

```ts
import { defineComponent } from 'weco-js';
defineComponent('app-button', ButtonComponent);
```

## Using the Custom Element

After defining the component, you can use it in your HTML like this:

```tsx
<button is="app-button"></button>
```

## Best Practices for Defining Components

### 1. Define in the Main Entry File

It’s best to define custom elements in the `main.ts` file to ensure they are registered before being used:

```ts
import { defineComponent } from "weco-js";
import { App } from "./app/app.component";
import { ButtonComponent } from './button.component';

defineComponent('app-button', ButtonComponent); // Define the custom element
defineComponent('app-root', App);              // Define the root component
```

### 2. Define in Lazy-Loaded Components

Alternatively, if the component is part of a lazy-loaded module, you can define it in the root file of the module.

## Using Custom Elements as JSX Components

In addition to using the `is` attribute in HTML, you can also use the component directly in JSX syntax:

```tsx
<ButtonComponent />
```

This provides flexibility to use the component in a way that fits your project structure.

## Summary

To create and use a custom element in Weco JS:

1. Define the component with the `extends` property to specify the built-in element.
2. Register the component using `defineComponent`.
3. Use the custom element in your HTML with the `is` attribute or directly as a JSX component.

By following these steps, you can seamlessly integrate custom elements into your Weco JS application while maintaining clean and reusable code.
