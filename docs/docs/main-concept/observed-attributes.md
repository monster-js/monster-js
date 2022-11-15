---
sidebar_position: 7
---

# Observed attributes

Observed attributes are values passed down from parent component to child component as an element attribute and their changes is being observed by the child component.
This feature uses the web component's observed attributes implementation.
The same as web component's implementation we cannot pass objects and arrays to it.
It only accepts string values but MonsterJS implementation is a little advanced since it can convert the value into number or boolean.

## Define observed attributes

To define the list of attributes to be observed by the component we can use the `observedAttributes` function to do it.

Example.

```typescript
import { component, observedAttributes } from '@monster-js/core';

export function app() {
    return <h1>App</h1>
}

component(app, 'app-root');
observedAttributes(app, 'name', 'age', 'is-verified-user');
```

## String attribute

This type of attribute is the same as the normal web component observed attributes which accepts string as value.
It uses the `attribute` function to get the value and watch for changes of the attribute.

Example.

```typescript title="Child component"
import { component, attribute } from '@monster-js/core';

export function child() {

    const name = attribute(this, 'name');

    return <h1>{name()}</h1>
}

component(child, 'app-root');
observedAttributes(child, 'name', 'age', 'is-verified-user');
```

```typescript title="Parent component"
import { component } from '@monster-js/core';

export function parent() {

    const [name] = useState(this, 'John Doe');

    return <app-child name={name()}></app-child>
}

component(parent, 'app-parent')
```

In the example above the child component has an observed attribute named `name`.
Every time the `name` state of the parent component is changed, it will also be reflected in the child component's `name` attribute getter.

The `attribute` function can have a third argument that accepts callback function that is called when the attribute is changed.

Example.

```typescript
attribute(this, 'name', (newValue: string, oldValue: string) => {
    console.log(newValue, oldValue);
});
```

## Boolean attribute

This type of attribute has the same implementation of the string attribute above.
The only difference is that the value is converted into boolean value instead of string.
The value will only be false if the attribute value is `"null", "undefined", "", "0", or "false"`.
It uses the `attrBoolean` function to get the value and watch for changes of the attribute.

Example.

```typescript title="Child component"
import { component, attrBoolean } from '@monster-js/core';

export function child() {

    const isVerified = attrBoolean(this, 'is-verified-user');

    return <h1>{isVerified() ? 'Yes' : 'No'}</h1>
}

component(child, 'app-root');
observedAttributes(child, 'name', 'age', 'is-verified-user');
```

```typescript title="Parent component"
import { component } from '@monster-js/core';

export function parent() {

    const [isVerified] = useState(this, true);

    return <app-child is-verified-user={isVerified()}></app-child>
}

component(parent, 'app-parent')
```

The `attrBoolean` function can have a third argument that accepts callback function that is called when the attribute is changed.

Example.

```typescript
attrBoolean(this, 'is-verified-user', (newValue: boolean, oldValue: boolean) => {
    console.log(newValue, oldValue);
});
```

## Number attribute

This type of attribute has the same implementation of the string attribute above.
The only difference is that the value is converted into number value instead of string.
It uses the `attrNumber` function to get the value and watch for changes of the attribute.

Example.

```typescript title="Child component"
import { component, attrNumber } from '@monster-js/core';

export function child() {

    const age = attrNumber(this, 'age');

    return <h1>{age()}</h1>
}

component(child, 'app-root');
observedAttributes(child, 'name', 'age', 'is-verified-user');
```

```typescript title="Parent component"
import { component } from '@monster-js/core';

export function parent() {

    const [age] = useState(this, 20);

    return <app-child age={age()}></app-child>
}

component(parent, 'app-parent')
```

The `attrNumber` function can have a third argument that accepts callback function that is called when the attribute is changed.

Example.

```typescript
attrNumber(this, 'age', (newValue: number, oldValue: number) => {
    console.log(newValue, oldValue);
});
```

## The attributeChangedCallback hook

This is a hook that runs each time if one of the observed attributes is added, removed, or updated.
It has two arguments, first is the `this` context of the component, and second is the callback.
Please check the [lifecycle hooks](./lifecyle-hooks) for more information about this hook.

Example.

```typescript title="Child component"
import { component, observedAttributes, attributeChanged } from '@monster-js/core';

export function child() {

    attributeChanged(this, (name: string, oldValue: any, newValue: any) => {
        console.log(name, oldValue, newValue);
    });

    return <h1>Child component</h1>
}

component(child, 'app-root');
observedAttributes(child, 'name', 'age', 'is-verified-user');
```