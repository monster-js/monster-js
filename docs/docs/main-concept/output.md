---
sidebar_position: 8.1
---

# Output function

The output function is a way to expose a function outside the component so that we can trigger this from the parent component.

## Syntax

The `output` function has three parameters.

```typescript
output(<this_context>, <output_function_key>, <callback>);
```

### Parameters

| Parameter | Description |
| --- | --- |
| this_context | The component's `this` context |
| output_function_key | The property key that will be used to trigger the output function outside the component. |
| callback | The callback function that will run once the output function is triggered from outside the component. |

Example.

```tsx title="child.component.tsx"
import { component, output } from '@monster-js/core';

export function child() {
    output(this, 'outputFunction', () => {
        console.log('I was triggered outside this component');
    });
    return <h1>Child component</h1>
}

component(child, 'app-child');
```

```tsx title="parent.component.tsx"
export function parent() {

    let childRef: any;

    const clickMe = () => {
        childRef.outputFunction();
    }

    return <div>
        <button on:click={clickMe}>Click Me</button>
        <app-child v:ref={childRef}></app-child>
    </div>
}
```

## Typing

We can also provide a generic types to our output function.
This will help developers to easily identify what are the properties they can use.
This will also help use for type checking.

Example.

```tsx title="child.interface.ts"
export interface Child {
    outputFunction: () => void;
}
```

```tsx title="child.component.tsx"
import { component, output } from '@monster-js/core';
import { Child } from './child.interface';

export function child() {
    output<Child>(this, 'outputFunction', () => {
        console.log('I was triggered outside this component');
    });
    return <h1>Child component</h1>
}

component(child, 'app-child');
```

```tsx title="parent.component.tsx"
import { Child } from './child.interface';

export function parent() {

    let childRef: Child;

    const clickMe = () => {
        childRef.outputFunction();
    }

    return <div>
        <button on:click={clickMe}>Click Me</button>
        <app-child v:ref={childRef}></app-child>
    </div>
}
```
