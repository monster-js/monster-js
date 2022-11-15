---
sidebar_position: 12
---

# Pipes

Pipes are used to transform a string, object, number and other values for display.
They are very useful because it can be used directly in template or logic in all of our components.

## Register pipe

Before we can use the pipes we need to register it in a component or in the module.

Here are the examples on how to register a pipe in component and in module.

Example.

```typescript title="In component"
import { component, pipes, lowercase } from '@monster-js/core';

export function greeting() {
    return <h1>{ 'Hello World!' | lowercase }</h1>
}

component(greeting, 'app-greeting');
pipes(greeting, lowercase);
```


```typescript title="In module"
import { lowercase } from '@monster-js/core';
import { Module } from '@monster-js/core/module';

export const GreetingModule: Module = {
    pipes: [lowercase]
};
```

## Template pipes

In the template, we can use the pipes inside jsx expression container `{}`.
The syntax is `{ <value> | <pipe selector> }`.

Example.

```typescript
<label>{ 'Hello World' | lowercase }</label>
```

In the example above, the `lowercase` is the pipe.

:::danger
Template pipes may throw a typescript type checking error since the pipe operator is originally an arithmetic operator that accepts any, number and bigint values.
A temporary fix for this is to set our values to type any.
This error will be addressed in later releases.
:::

Template pipes can also be chained to another pipe.

Example.

```typescript
<label>{ 'Hello World 123' | lowercase | removeNumeric }</label>
```

In the example above, the `lowercase` pipe will run first and the `removeNumeric` pipe will run after the lowercase pipe.

## Logic pipes

To use the pipe inside the component's logic we can just call the pipe function.

Example.

```typescript
import { component, pipes } from '@monster-js/core';
import { lowercase } from './lowercase.pipe';

export function greeting() {

    const message = lowercase('Hello World!');

    return <h1>{message}</h1>
}

component(greeting, 'app-greeting');
pipes(greeting, lowercase);
```

## Available pipes

Here are some usable pipes included in the core package.

<!-- 
Date pipe resources
https://github.com/angular/angular/blob/main/packages/common/src/pipes/date_pipe.ts
-->
| Pipe | Description |
| --- | --- |
| [lowercase](/docs/useful-topics/available-pipes#lowercasepipe) | Transform string into lowercase. |
| [uppercase](/docs/useful-topics/available-pipes#uppercasepipe) | Transform string into uppercase. |

## Pipe with parameters

Pipes can also have one or more parameters to be used during transformation.

```typescript title="In template"
<label>{this.date | date('YYYY-MM-DD', 'Invalid date')}</label>
```

```typescript title="In logic"
import { Component, Pipes } from '@monster-js/core';
import { datePipe } from './date.pipe';

export function dateComponent() {

    const date = datePipe(new Date(), ['YYYY-MM-DD', 'Invalid date']);

    return <h1>{date}</h1>
}

component(dateComponent, 'app-greeting')
pipes(dateComponent, datePipe)
```