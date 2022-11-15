---
sidebar_position: 15
---

# List rendering

List rendering directive allows developers to render a list of element based on the given array of data.

## Syntax

The syntax of list rendering directive is `v:for={<array>}`.

## Using list rendering

Here's an example on how to use list rendering.

Example.

```typescript
import { component } from '@monster-js/core';

export function greeting() {

    const array = [1, 2, 3];

    return <p v:for={array}>Hello World!</p>
}

component(greeting, 'app-greeting');
```

The example code above will generate a list of elements that looks like the following:

```html
<p>Hello World!</p>
<p>Hello World!</p>
<p>Hello World!</p>
```

There are three `<p>` tags since there are three elements inside the variable `array`.

## List item name

`v:for-item="<item name>"`

It allows developers to set the variable name of the list item and display it in view.
If no list item directive is provided, it is `$item` by default.

Example.

```typescript
import { component } from '@monster-js/core';

export function greeting() {

    const array = ['foo', 'bar', 'bazz'];

    return <p v:for={array} v:for-item="listItem">Hello {listItem}!</p>
}

component(greeting, 'app-greeting')
```

:::note
The codes above might throw a typescript linter error `Cannot find name 'listItem'` since `listItem` is not defined.
A temporary fix for this is to declare the list item above our component and below the import statements list the following.

```typescript
declare const listItem: string;
```
:::

The example code above will generate a list of elements that looks like the following:

```html
<p>Hello foo!</p>
<p>Hello bar!</p>
<p>Hello bazz!</p>
```

## List index

`v:for-index="<index name>"`

It allows developers to set the variable name of the list item index.
If no list index directive is provided, it is `$index` by default.

Example.

```typescript
import { component } from '@monster-js/core';

export function greeting() {

    const array = ['foo', 'bar', 'bazz'];

    return <p v:for={array} v:for-index="listIndex">Hello {listIndex}!</p>
}

component(greeting, 'app-greeting');
```

:::note
The codes above might throw a typescript linter error `Cannot find name 'listIndex'` since `listIndex` is not defined.
A temporary fix for this is to declare the list item above our component and below the import statements list the following.

```typescript
declare const listIndex: number;
```
:::

The example code above will generate a list of elements that looks like the following:

```html
<p>Hello 0!</p>
<p>Hello 1!</p>
<p>Hello 2!</p>
```

## Update event

`v:for-update={<callback function>}`

List rendering is able to trigger an event if there is a change in the length of the array.

Example.

```typescript
import { component } from '@monster-js/core';

export function greeting() {

    const array = [1, 2, 3];

    const arrayLengthUpdated = () => {
        console.log('array length is updated');
    }

    return <p v:for={array} v:for-update={arrayLengthUpdated}>Hello World!</p>
}

component(greeting, 'app-greeting');
```
