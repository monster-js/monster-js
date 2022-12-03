---
sidebar_position: 8.3
---

# Conditional rendering

Conditional rendering is used to conditionally render an element to the dom.
It uses the `v:if` directive which removes an element from the dom if the value is a falsy and append the element if otherwise.

## Syntax

The syntax of conditional rendering directive is `v:if={<boolean>}`.

## Using conditional rendering

Here's an example on how to use conditional rendering.

```typescript
import { component, useState } from '@monster-js/core';

export function greeting() {
    const [toggle] = useState(this, true);

    return <h1 v:if={toggle()}>Hello World!</h1>
}

component(greeting, 'app-greeting');
```