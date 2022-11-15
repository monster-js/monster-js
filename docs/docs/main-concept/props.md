---
sidebar_position: 8
---

# Props

Props is a directive that allows developers to pass any type of data from parent to child.
It is more advance than [observed attributes](./observed-attributes) since observed attributes can only have string, number or boolean values.

## Syntax

Props directives are namespaced with `prop` followed by the property name.
The syntax of props is written as `prop:<name>=<data>`.

Example.

```
prop:message="Hello World!"
```

## Pass props from parent to child

Here's an example on how to pass properties to child component:

```typescript
import { component } from '@monster-js/core';

export function parent() {

    const date = new Date();
    const user = { ... };
    const posts = [ ... ];

    return <app-child
        prop:date={date}
        prop:user={user}
        prop:posts={posts}
    ></app-child>
}

component(parent, 'app-parent');
```

## Get props

To access the props values, we can give our component a parameter that will hold the references to our props.

Example.

```typescript
import { component } from '@monster-js/core';

export function child(props) {

    console.log(props.date);
    console.log(props.user);
    console.log(props.post);

    return <h1>Child component</h1>
}

component(child, 'app-child')
```

## On props change event

We can watch for props changes using the `onPropsChange` hook.
This hook will trigger once there is a changes in any of the props on the parent component side.
Please see [lifecycle hooks](./lifecyle-hooks) for more information about this hook.

Example.

```typescript
import { component, onPropsChange } from '@monster-js/core';

export function child(props) {

    onPropsChange(this, () => {
        console.log('Props has been changed');
    });

    return <h1>Child component</h1>
}

component(child, 'app-child')
```
