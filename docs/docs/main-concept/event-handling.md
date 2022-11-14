---
sidebar_position: 6
---

# Event handling

Event handling is a directive that allows the component to respond to user action on the UI like button clicks, text inputs, drag elements and other actions.
It uses a directive with namespace of `on` or `on-prevent` to bind a function to an element as an event listener.

## Syntax

The syntax of event handling directive is `on:<event_name>={<function>}`.

Example.

```typescript
import { component } from '@monster-js/core';

export function greeting() {

    const clickMe = () => {
        console.log('Hello World!');
    }

    return <button on:click={clickMe}>Greet</button>
}

component(greeting, 'app-greeting');
```

## Function parameters

Since the directive value for event handling is a function, we can pass some arguments to the function by using a fat arrow function and pass the event handler to its body.

Example.

```typescript
import { component } from '@monster-js/core';

export function greeting() {

    const clickMe = (name: string) => {
        console.log(`Hello ${name}!`);
    }

    return <button on:click={()=> clickMe('John')}>Greet</button>
}

component(greeting, 'app-greeting');
```

## Event variable

We can also get the event variable that holds the data of the event like the following example.

Example.

```typescript
import { component } from '@monster-js/core';

export function greeting() {

    const clickMe = (event) => {
        console.log(event);
    }

    return <button on:click={(event) => clickMe(event)}>Greet</button>
}

component(greeting, 'app-greeting')
```

or

```typescript
import { component } from '@monster-js/core';

export function greeting() {

    const clickMe = (event) => {
        console.log(event);
    }

    return <button on:click={clickMe}>Greet</button>
}

component(greeting, 'app-greeting')
```

will have the same result.
