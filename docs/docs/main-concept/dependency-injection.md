---
sidebar_position: 14.5
---

# Dependency injection

In MonsterJS dependency injection is a design pattern in which a class or function receives another class or function that it depends on.

## The providers function

`import { providers } from '@monster-js/core';`

The providers function is used to setup the classes and functions so that we can inject it to our component.

### Syntax

`providers(<component>, ...<dependencies>)`

Example.

```typescript
import { component, providers } from '@monster-js/core';
import { Service1 } from './service1.service';
import { Service2 } from './service2.service';

export function app() {
    return <h1>App</h1>
}

component(app, 'app-root');
providers(app, Service1, Service2);
```

## The providers array in module

The providers array in a module is another way to setup the classes and functions so that they can be injection to the components registered in the this module.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { Service1 } from './service1.service';
import { Service2 } from './service2.service';

export const AppModule: Module = {
    providers: [Service1, Service2]
};
```

## Dependency configuration

We can also configure the dependency when we register it in providers array or in providers function.
Instead of passing the class we can pass an object.

Example.

```typescript
export const AppModule: Module = {
    providers: [{ provider: Service1 }]
};
```

### The useValue property

The useValue property is used to return a value instead of the class instance when resolving the dependencies.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { Service1 } from './service1.service';

export const AppModule: Module = {
    providers: [{ provider: Service1, useValue: { greeting: 'Hello world!' } }]
};
```

or

```typescript
import { component, providers } from '@monster-js/core';
import { Service1 } from './service1.service';

export function app() {
    return <h1>App</h1>
}

component(app, 'app-root');
providers(app, { provider: Service1, useValue: { greeting: 'Hello world!' } });
```

In the examples above, when we inject the `Service1` into our component it will return the object `{ greeting: 'Hello world!' }`.

### The useClass property

The useClass property is used to replace the dependency with other class when resolving the dependencies.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { Service1 } from './service1.service';
import { Service2 } from './service2.service';

export const AppModule: Module = {
    providers: [{ provider: Service1, useClass: Service2 }]
};
```
or

```typescript
import { component, providers } from '@monster-js/core';
import { Service1 } from './service1.service';
import { Service2 } from './service2.service';

export function app() {
    return <h1>App</h1>
}

component(app, 'app-root');
providers(app, { provider: Service1, useClass: Service2 });
```

In the example above, when we inject the `Service1` into our component it will return the resolved instance of `Service2` instead.

## Inject dependencies

When injecting the dependencies, we use the `inject(<context>, <dependency>)` function for component and directives.
In services and guards we can inject the dependencies in the constructor(`constructor(private <property_name>: <dependency>)`).

### Inject dependencies in component

```typescript
import { component, providers, inject } from '@monster-js/core';
import { Service1 } from './service1.service';

export function app() {

    const service1 = inject(this, Service1);

    return <h1>App</h1>
}

component(app, 'app-root');
providers(app, Service1);
```

### Inject dependencies in service

```typescript
import { Service } from '@monster-js/core';
import { Service1 } from './service1.service';

@Service()
export class GreetingService {

    constructor(private service1: Service1) {}

}
```

### Inject dependencies in directive

```typescript
import { directive, AllDirectivesArg } from '@monster-js/core';
import { Service1 } from './service1.service';

export function highlight(arg: AllDirectiveArg) {

    const service1 = inject(arg.component, Service1);

}

directive(highlight, 'highlight');
```