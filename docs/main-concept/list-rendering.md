# List Rendering

In Monster JS, list rendering allows you to easily iterate over an array and render each item in the array within a specified template.
This is achieved using the `v:for` directive, which provides automatic handling of the array items and their indices.

## Basic Usage of List Rendering

To render a list in Monster JS, use the `v:for` directive to iterate over an array and bind each item and its index to specific template variables.
By default, the `v:for` directive provides two variables: `$item` for the current item and `$index` for the current index.

### Example

```tsx
function ListComponent() {
    return <ul>
        <li v:for={[1,2,3]}>Item value: {$item}, Item index: {$index}</li>
    </ul>
}
```

In this example:

* The `v:for` directive iterates over the array `[1,2,3]`.
* `$item` represents the current item in the array, and `$index` represents the current index.
* Each `<li>` element displays the item and its index.

## Handling Undefined Variables

If you encounter an error related to undefined variables (e.g., `$item` or `$index` not being defined), you may need to explicitly declare these variables at the top of the component function using `declare`. This can happen due to TypeScript's type checking or if the variables are not recognized in certain contexts.

### Declaring Default Item and Index Variables

```tsx
declare const $item: any;
declare const $index: number;

function ListComponent() {
    return <ul>
        <li v:for={[1,2,3]}>Item value: {$item}, Item index: {$index}</li>
    </ul>
}
```

## Customizing Item and Index Variable Names

You can customize the names of the `$item` and `$index` variables using `v:for-item` and `v:for-index` directives. This allows you to define more descriptive variable names if needed.

### Example with Custom Variable Names

```tsx
function ListComponent() {
    return <ul>
        <li v:for={[1,2,3]} v:for-item="listItem" v:for-index="listIndex">Item value: {listItem}, Item index: {listIndex}</li>
    </ul>
}
```

In this example:

* `v:for-item="listItem"` sets the current item to `listItem`.
* `v:for-index="listIndex"` sets the current index to `listIndex`.
* Each `<li>` displays the item and index using these custom variable names.

### Declaring Custom Item and Index Variables

If using custom names for the item and index, declare them as follows:

```tsx
declare const listItem: any;
declare const listIndex: number;

function ListComponent() {
    return <ul>
        <li v:for={[1,2,3]} v:for-item="listItem" v:for-index="listIndex">Item value: {listItem}, Item index: {listIndex}</li>
    </ul>
}
```

## Adding Track By Functionality

The `v:for-track-by` attribute allows you to optimize rendering by specifying a unique property of each item in the array. This ensures efficient DOM updates when the array changes. If no `v:for-track-by` is provided, Monster JS defaults to tracking items by their `index`.

### Example with `v:for-track-by`

```tsx
function ListComponent() {
    const items = [
        { id: 1, value: 'Item 1' },
        { id: 2, value: 'Item 2' },
        { id: 3, value: 'Item 3' }
    ];

    return <ul>
        <li v:for={items} v:for-track-by="id" v:for-item="listItem" v:for-index="listIndex">
            Item value: {listItem.value}, Item index: {listIndex}
        </li>
    </ul>
}
```

In this example:
* `v:for-track-by="id"` uses the id property of each item to uniquely identify it.
* The DOM updates efficiently when the array changes because Monster JS tracks items by their `id`.

If no `v:for-track-by` is provided, the framework will default to tracking items by their index, which may be sufficient for simple arrays without unique properties.

### Benefits of Using `v:for-track-by`
* Avoids unnecessary re-rendering of list items when their order or content changes.
* Ensures better performance, especially for large lists.

## Summary

* Use `v:for` to iterate over arrays in Monster JS, where `$item` represents the current item and `$index` represents the index.
* Customize item and index variable names with `v:for-item` and `v:for-index`.
* Optimize rendering using `v:for-track-by` to track items by a unique property. If `v:for-track-by` is not provided, items are tracked by their index.
* Declare `$item`, `$index`, or custom variables at the top of the function if you encounter undefined variable errors.

List rendering in Monster JS provides a powerful way to dynamically generate elements based on arrays, offering flexibility with custom variable names and explicit declarations when needed.
