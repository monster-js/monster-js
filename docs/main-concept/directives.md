# Directives

In **Weco JS**, directives allow you to define reusable behavior that can be attached to elements within your components.
Directives can be used to modify elements or apply specific behaviors based on the directive's logic.
This documentation explains how to define and use directives in Weco JS.

## Defining a Directive

To create a directive, you define a function that will receive:

* The **element** to which the directive is applied.
* A **value caller** function that returns the dynamic value passed to the directive.

Here's an example of a directive called `highlightDirective` that applies a background color to the element based on the value provided:

```tsx
function highlightDirective(element: Element, valueCaller: () => any) {
    return <div style={`background: ${valueCaller()};`}>
        <element-outlet element={element} />
    </div>;
}
```

### Explanation

* **element**: The element to which the directive is applied. The `highlightDirective` can modify this element by wrapping it in a new element with specific styles.
* **valueCaller**: A function that returns the value passed to the directive, in this case, the background color.

In the example above, `highlightDirective` wraps the original element in a `<div>` with a background color based on `valueCaller()`.

### Special Element: `<element-outlet>`

The `<element-outlet>` component is used as a placeholder to reinsert the original element inside the directive's structure, preserving its original behavior and content.

## Using Directives in Components

After defining a directive, you can apply it to an element in your component by specifying it with the `dir:` prefix. To make the directive available in your component, you must register it using `registerConfig`.

### Example Usage

Here’s an example of a component that uses the `highlightDirective` to highlight text:

```tsx
function Message() {
    return <p>Welcome, <span dir:highlight="red">John</span>!</p>;
}

registerConfig(Message, {
    directives: {
        highlight: highlightDirective
    }
});
```

### Explanation

1. **dir:highlight="red"**: Applies the `highlight` directive to the `<span>` element. The `highlight` directive will use `"red"` as the background color.
2. **registerConfig**: Registers the `highlight` directive with the `Message` component so it can be used within the component.

## How It Works

When Weco JS processes the component:

* It locates elements with the `dir:` prefix (in this case, `dir:highlight`).
* It replaces the directive with the output of the directive function, modifying the element based on the directive logic.

## Registering Multiple Directives

You can register multiple directives with a component by adding them to the directives object in `registerConfig`. For example:

```ts
registerConfig(Message, {
    directives: {
        highlight: highlightDirective,
        anotherDirective: anotherDirectiveFunction
    }
});
```

## Summary

Directives in Weco JS provide a powerful way to encapsulate and reuse behavior. By defining a directive function and registering it with `registerConfig`, you can easily apply reusable transformations or behaviors to any element in your components.