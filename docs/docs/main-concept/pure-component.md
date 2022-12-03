---
sidebar_position: 1.1
---

# Pure Component

The pure component in MonsterJS is a component used for the purposes of rendering small pieces of UI.
This type of component is not a web component so it cannot have an observed attributes but it can have props.
We can use this type of component inside of all our component without having to register it a module or defining it as a global component.

## Pure component requirements

There are some requirements to create a pure component.

1. It should not be an arrow function.
2. The function name must start with an uppercase letter.

## Create pure components

To create a pure components, we can just create a function that returns a JSX element.

Example.

```tsx
export function Button() {
    return <button>Click me</button>
}
```

## Pure component styles

We can also style pure components the same way we apply styles to a normal component using the `useStyle` function.
Styles of pure components only applies to its element and will not affect the parent and its child components.

Example.

```css title="button.component.scss"
button {
    color: red;
}
```

```tsx title="button.component.tsx"
import styles from './button.component.scss';
import { useStyle } from '@monster-js/core';

export function Button() {
    return <button>Click me</button>
}

useStyle(Button, styles);
```

## Render pure components

To render the pure component into the view we can just create a JSX element using the pure component name as the element local name.

Example.

```tsx title="Button component"
export function Button() {
    return <button>Click me</button>
}
```

```tsx title="Parent component"
import { component } from '@monster-js/core';
import { Button } from './button.component';

export function parent() {
    return <div>
        <Button></Button>
    </div>
}

component(parent, 'app-parent');
```

## Props

The same as normal components, pure component can have props.
We can pass the props the same way we pass props for normal components.

Example.

```tsx title="Button component"
export function Button(props) {
    return <button>{props.btnText}</button>
}
```

```tsx title="Parent component"
import { component } from '@monster-js/core';
import { Button } from './button.component';

export function parent() {
    return <div>
        <Button prop:btn-text="Click Me"></Button>
    </div>
}

component(parent, 'app-parent');
```

## Lifecycle hooks

Using lifecycle hooks inside a pure component is strongly discouraged because it can cause memory leak if the pure component is used in list rendering or conditional rendering.
Using pure component outside list rendering and conditional rendering has no problem.

## Change detection

Pure components are merged with their parent component so changes of the state of pure component or in parent component will trigger change detection of both components.
