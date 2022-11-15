---
sidebar_position: 1
---

# Available pipes

MonsterJS provides a set of pipes.
These pipes are not available in components by default so we still need to register these pipes in our module or component.
Please check the [pipes](/docs/main-concept/pipes) documentation for more information about pipes.

## Lowercase Pipe

This pipe is used to transform string to lowercase.

Example.

```typescript title="In template"
import { component, pipes, lowercase } from '@monster-js/core';

export function greeting() {
    return <h1>{ 'Hello World' | lowercase }</h1>
}

component(greeting, 'app-greeting');
pipes(greeting, lowercase);
```

```typescript title="In logic"
import { component, pipes, lowercase } from '@monster-js/core';

export function greeting() {

    const message = lowercase('Hello World!');

    return <h1>{message}</h1>
}

component(greeting, 'app-greeting');
pipes(greeting, lowercase);
```

## Uppercase Pipe

This pipe is used to transform string to uppercase.

Example.

```typescript title="In template"
import { component, pipes, uppercase } from '@monster-js/core';

export function greeting() {
    return <h1>{ 'Hello World' | uppercase }</h1>
}

component(greeting, 'app-greeting');
pipes(greeting, uppercase);
```

```typescript title="In logic"
import { component, pipes, uppercase } from '@monster-js/core';

export function greeting() {

    const message = uppercase('Hello World!');

    return <h1>{message}</h1>
}

component(greeting, 'app-greeting');
pipes(greeting, uppercase);
```