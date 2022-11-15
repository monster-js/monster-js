---
sidebar_position: 10
---

# Directives

Directive is another way to change the appearance and add additional behavior to an element.

## Syntax

The syntax of directive is `<namespace>:<name>="<value>"`.
The value can be a string or jsx expression container`{}` or you can also omit the value because it is optional.

## Available directives

The following are the list of directives provided by the core package.

### View model directive

`import { viewModel } from '@monster-js/core'`;

#### Syntax

`v:model={<state>}`

View model directive is a two way binding of data.
Every time the model is changed from the view, the state in logic will be updated and the same thing will happen in the view when the model is updated from the logic.

Example.

```typescript
import { component, useState } from '@monster-js/core';

export function greeting() {

    const model = useState(this, 'Hello world!');
    const [getter] = model;

    return <div>
        <h1>{getter()}</h1>
        <input v:model={model} type="text" />
    </div>
}

component(greeting, 'app-greeting');
```

### View class directive

`import { viewDirectives } from '@monster-js/core';`

#### Syntax

`v:class={<object>}`

View class directive is used to conditionally add or remove a class to an element.
It accepts an object and add the object property key as the element class if the property value is truthy.

Example.

```typescript
import { component } from '@monster-js/core';

export function greeting(props) {

    return <a href="#" v:class={{ active: props.counter > 10 }}>Hello world!</a>

}

component(greeting, 'app-greeting');
```

### View reference directive

`import { viewDirectives } from '@monster-js/core';`

#### Syntax

`v:ref={<reference_holder>}`

This directive is used to create a reference of an element to the variable in logic.

Example.

```typescript
import { component } from '@monster-js/core';

export function greeting() {

    let elementRef: HTMLElement;

    return <h1 v:ref={elementRef}>Hello world!</h1>
}

component(greeting, 'app-greeting');
```

After view is initialized `elementRef` variable should now have the reference to the `h1` element in the view.

### Prop directive

#### Syntax

`prop:<name>`

Prop directive is a built-in directive that allows developers to pass any type of data from parent to child.
Check [props](./props) for more information about this directive.

Example.

```typescript
import { component } from '@monster-js/core';

export function root() {
    const user = {
        fistName: 'John',
        lastName: 'Smith'
    };

    return <app-child prop:user={user} />
}

component(root, 'app-root');
```

### Event directive

#### Syntax

`on:<event name>`

Event directive is a built-in directive used to attach an event handler into an element.
Check the [event handling](./event-handling) for more information about this directive.

Example.

```typescript
import { component } from '@monster-js/core';

export function greeting() {

    const greet = () => {
        console.log('Hello World!');
    }

    return <button on:click={greet}>Greet</button>
}

component(greeting, 'app-greeting')
```

Here is a list of available events from [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/Events).

### Event preventDefault directive

#### Syntax

`on-prevent:<event name>`

This directive is the same the as event directive with `on` namespace but it stops the default action of an element from happening using `event.preventDefault()`.

Example.

```typescript
import { component } from '@monster-js/core';

export function greeting() {

    const submit = () => {
        console.log('Hello World!');
    }

    return <form on-prevent:submit={submit}>
        <input type="text" />
        <button type="submit">Submit</button>
    </form>
}

component(greeting, 'app-greeting')
```

The default action when a form is submitted will refresh the page or go to another page.
When using the `on-prevent` namespace, the default action will not happen so we have a better control of what actions to make after the form is submitted.

### List rendering directive

#### Syntax

`v:for`

List rendering directive is a built-in directive.
It allows developers to render a list of element based on the given array of data.
Check the [list rendering](./list-rendering) for more information.

Example.

```typescript
import { component } from '@monster-js/core';

export function list() {

    const array = [1, 2, 3];

    return <p v:for={this.array}>Hello World!</p>
}

component(list, 'app-list')
```

### Conditional rendering directive

`v:if`

Conditional rendering directive is used to conditionally render an element to the dom.
It will remove the element from the dom if the value of the directive is false and append the element if otherwise.

Example.

```typescript
import { component } from '@monster-js/core';

export function greeting() {

    const [toggle] = useState(this, true);

    render() {
        return <h1 v:if={toggle()}>Hello World!</h1>
    }
}

component(greeting, 'app-greeting')
```
