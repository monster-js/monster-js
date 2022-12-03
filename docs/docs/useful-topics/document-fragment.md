---
sidebar_position: 3
---

# Document fragment

Document fragment is a jsx element that allows you to group a list of elements without creating a DOM element.

## Group element using document fragment

To group elements using document fragment we just need to create a `<fragment></fragment>` element and put the elements to be grouped as a child element of the fragment tag.

Example.

```tsx
export function app() {
    return <fragment>
        <h1>Element 1</h1>
        <h1>Element 2</h1>
    </fragment>
}
```

Document fragment can only have child elements and it cannot have attributes, props, or directives.
