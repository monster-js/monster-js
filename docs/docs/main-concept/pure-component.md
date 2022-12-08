---
sidebar_position: 1.1
---

# Pure Component

The pure component in MonsterJS is a component used for the purposes of rendering small pieces of UI.
This type of component is not a web component so it cannot have an observed attributes but it can have props.
We can use this type of component inside of all our component without having to register it a module or defining it as a global component.

:::info
Directives, events, and other namespaced attributes in pure component are not allowed.
Attributes passed to a pure component are turned into props.
:::

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
Pure components cannot have directives so attributes of pure components are turned into props.

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
        <Button btn-text="Click Me"></Button>
    </div>
}

component(parent, 'app-parent');
```

## Structural directives

Structural directives may throw a linting error specially when there is a typescript type for our props so we should extend our props type with `StructuralDirectives` interface.

Example.

```tsx title="button.component.tsx"
interface Props {
    title: string;
}

export function Button(props: Props) {
    return <button>{props.title}</button>
}
```

```tsx title="parent.component.tsx"
export function parent() {
    return <div>
        <Button v:if={true} title="Click me"></Button>
    </div>
}
```

In the example above, the `v:if={true}` will throw an error since `v:if` is not defined in the `Props` interface.

To fix this issue, we need to extend the `Props` interface with `StructuralDirectives`.

Example.

```tsx title="button.component.tsx"
import { StructuralDirectives } from '@monster-js/core';

interface Props extends StructuralDirectives {
    title: string;
}

export function Button(props: Props) {
    return <button>{props.title}</button>
}
```

And this should solve the issue.

## Lifecycle hooks

Using lifecycle hooks inside a pure component is strongly discouraged because it can cause memory leak if the pure component is used in list rendering or conditional rendering.
Using pure component outside list rendering and conditional rendering has no problem.

## Change detection

Pure components are merged with their parent component so changes of the state of pure component or in parent component will trigger change detection of both components.
