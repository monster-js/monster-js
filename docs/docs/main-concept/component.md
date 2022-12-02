---
sidebar_position: 1
---

# Component

Components are the most basic building block of an application.
It is composed of template, logic and styles.
It is used to split the UI into small and reusable pieces of codes.

:::note
Component file must have an extension of `.tsx` instead of `.ts`.
:::

## Logic and template

The logic and template are combined in a single file.
It is a function that returns a single jsx element with zero to many child jsx elements.
Since a component file has jsx codes inside it, it should have an extension of `.tsx` instead of `.ts`.

Example.

```typescript
import { component } from '@monster-js/core';

export function greeting() {
    return <h1>Hello World!</h1>
}

component(greeting, 'app-greeting');
```

To mark the function as a component we can use the `component` function like example above.
The parameter of `component` function will be the function component, the web component selector, and an optional third parameter which is the style of the component.
In the example above the selector is `app-greeting` which means our component must be `<app-greeting />` when we render it to the view.

:::caution
Selector must be all lowercase or it might throw an error if there are uppercase characters.
:::

## Styles

MonsterJS uses `sass` by default but we can also use other css frameworks depending on our webpack configuration.
The component styles will only affect its corresponding component and will have no effect on its parent and child components.

Component styles is imported directly to the `.component.tsx` file.

Example.
```typescript
import styles from './greeting.component.scss';
import { Component } from '@monster-js/core';

export function greeting() {
    return <h1>Hello World!</h1>
}

component(greeting, 'app-greeting', styles);
```

:::note
In order for the component styles to work properly,
the component and styles must have the same filename with `.component.tsx` extension for the logic and view and `.component.scss` extension for the styles.
:::

Example.

```
greeting
    ├── greeting.component.tsx
    └── greeting.component.scss
```

## Shadow dom component

We can also create a shadow dom component to encapsulate our component.
To do this, we can use the `shadowComponent` function instead of `component`.
The `shadowComponent` function has four parameters.
First is the function component, second is the selector, third is the optional component style, and fourth is the shadow mode(`open` or `closed`) which is optional and the default is `open`,

Example.

```typescript
import styles from './greeting.component.scss';
import { shadowComponent } from '@monster-js/core';

export function greeting() {
    return <h1>Hello World!</h1>
}

shadowComponent(greeting, 'app-greeting', styles, 'closed');
```

## Web component slot

With shadow dom, we can display elements from parent to child component's view using slots.

Example.

#### Parent component
```typescript
import { component } from '@monster-js/core';

export function parent() {
    return <div>
        <app-child>
            <h1>I am a slot content</h1>
            <span>I am a slot content</span>
        </app-child>
    </div>
}

component(parent, 'app-parent');
```

All elements inside the `<app-child></app-child>` tag will be displayed in the child component slot.

#### Child component
```typescript
import { shadowComponent } from '@monster-js/core';

export function child() {
    return <div>
        <slot></slot>
    </div>
}

shadowComponent(child, 'app-child');
```

### Named slot

Named slots allows us to choose where we want to display the elements inside the child component's view.
A component can have multiple named slots.

Example.

#### Parent component
```typescript
import { component } from '@monster-js/core';

export function parent() {
    return <div>
        <app-child>
            <h1 slot="slot-1">I am a slot content</h1>
            <span slot="slot-2">I am a slot content</span>
        </app-child>
    </div>
}

component(parent, 'app-parent')
```

#### Child component
```typescript
import { shadowComponent } from '@monster-js/core';

export function child() {
    return <div>
        <slot name="slot-1"></slot>
        <div>
            <slot name="slot-2"></slot>
        </div>
    </div>
}

shadowComponent(child, 'app-child');
```

In the example above, the element `<h1 slot="slot-1">I am a slot content</h1>` from parent component will be display in `<slot name="slot-1"></slot>` in child component.
The same for the `<span slot="slot-2">I am a slot content</span>` will be displayed in `<slot name="slot-2"></slot>`.

:::note
Slots only works when using shadow dom.
:::

## Custom element component

Custom element allows us to define a new type of elements.
To create a custom element, we can use the `customElement` function.
This function has two parameter, first is the type of custom element constructor and second is what type of element it will extend.

Example.

```typescript
import { component, customElement } from '@monster-js/core';

export function customButton {
    return <span>I am a button!</span>
}

component(customButton, 'app-custom-button');
customElement(HTMLButtonElement, 'button');
```

In the example above, we created a custom element using `customElement(HTMLButtonElement, 'button')`.
That means we need to attach the component in a `<button></button>` element using the `is` attribute with the value of the component selector like the following.

```typescript
<button is="app-custom-button"></button>
```

## Define component

Component must be defined before we can use it.
Since MonsterJS components are web components, we can use the `customElement.define` as long as we have the MonsterJS polyfill referenced in `src/index.html`.
Please check [polyfill](/docs/useful-topics/polyfill) for more information about the MonsterJS polyfill.

Example.

```typescript title="index.ts"
import { greeting } from './greeting.component';

customElement.define('app-greeting', greeting as any);
```

We can also use the selector defined in the `component` function.

```javascript title="index.ts"
import { getSelector } from '@monster-js/core';
import { greeting } from './greeting.component';

customElement.define(getSelector(greeting), greeting as any);
```

or we can use the `defineComponent` function provided by the core module.

```javascript title="index.ts"
import { defineComponent } from '@monster-js/core';
import { greeting } from './greeting.component';

defineComponent(greeting);
```

## Define custom element component

Custom element components can also be defined using `customElement.define`.

Example.

```typescript
import { getSelector } from '@monster-js/core';
import { customButton } from './custom-button.component';

customElement.define(getSelector(customButton), customButton, {
    extends: 'button'
});
```

or

```typescript
import { defineComponent } from '@monster-js/core';
import { customButton } from './custom-button.component';

defineComponent(customButton);
```

or register it in a module


```typescript
import { customButton } from './custom-button.component';

export const AppModule: Module = {
    components: [customButton]
}
```

## Global components

Components can be registered as a global component.
Global components can be used in any components inside our application.

Example.

```typescript
import { globalComponents } from '@monster-js/core';
import { greeting } from './greeting.component';

globalComponents().addComponent(greeting);

customElement.define(getSelector(greeting), greeting);
```

We can also chain multiple `addComponent` to add multiple component.

Example.

```typescript
globalComponents()
    .addComponent(greeting)
    .addComponent(customButton)
    .addComponent(customCard);
```

Global components needs to be registered as global components first before we define the component using `customElements.define` to avoid issues.

## Register component to a module

For the component to be available for other components in a module, we need to register the component to the module.
Registered component does not need to be defined using `customElement.define` anymore.

To register the component, we just need to pass the component to the components array in a module.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { greeting } from './greeting.component';

export const AppModule: Module = {
    components: [greeting]
}
```

:::note
Components must be registered to one module only.
:::

Components must be registered to one module only.
If we want to use the component inside other module, we just need to export the component from it's module and import it's module to the one that needs the component.
Please see [Module](./module#register-components) for more information about exporting a component from it's module.

## Render a component into view

To render a component into view, we just need to call it's selector inside the template.

Example.

```typescript
<div>
    <app-greeting></app-greeting>
</div>
```
or
```typescript
<div>
    <app-greeting />
</div>
```

In the example above, the greeting component will be rendered in the view inside the `<app-greeting />` element as a web component as long as the greeting component is defined in a module or using the `customElement.define` function.

## Other web components

Web components that are not made using MonsterJS will also work inside a MonsterJS project.
We just need to register the web component's selector as a global component using `globalComponents` function found in the core package.

Example.

```typescript title="src/index.ts"
import { globalComponents } from '@monster-js/core';

globalComponents()
    .addExternal('external-web-component')
    .addExternal('another-external-web-component');
```

It is recommended that we register the external components inside `src/index.ts` file.

## Component directives

To use directives inside a component we need to register the directives to the component using `directives` function.
After we register the directive, we can now use it inside the component's template.

Please see [Directives](./directives) for more information about directives.

Example.

```typescript
import { component, directives } from '@monster-js/core';
import { highlightDirective } from './highlight.directive';

export function greeting() {
    return <h1 highlight:color="red">Hello World!</h1>
}

component('app-greeting')
directives(greeting, HighlightDirective)
```

We can also register multiple directives using the `directives` function.

Example.

```typescript
directives(greeting, highlightDirective, timeAgoDirective, dropdownDirective);
```

Directives can also be registered in a module and it will be available to all the components registered in the module.

Please see [Module](./module#register-directives) for more information about registering directives into a module.

## Component pipes

To use pipes inside a component we need to register the pipes to the component using `pipes` function.
After we register the pipe, we can now use it inside the component's logic and template.

Please see [Pipes](./pipes) for more information about pipes.

Example.

```typescript
import { component, pipes } from '@monster-js/core';
import { uppercasePipe } from './uppercase.pipe';

export function greeting() {

    const greeting: any = 'Hello World!';

    return <h1>{this.greeting | uppercase}</h1>
}

component(greeting, 'app-greeting')
pipes(greeting, uppercasePipe)
```

To use the pipe inside the component's logic we can just call the pipe function.

Example.

```typescript
import { component, pipes } from '@monster-js/core';
import { uppercasePipe } from './uppercase.pipe';

export function greeting() {

    const greeting = uppercasePipe('Hello World!');

    return <h1>{greeting}</h1>
}

component(greeting, 'app-greeting');
pipes(greeting, uppercasePipe);
```

We can also register multiple pipes using the `pipes` function.

Example.

```typescript
pipes(greeting, uppercasePipe, lowercasePipe, datePipe);
```

Pipes can also be registered in a module so that it will be available to all the components registered in the module.

Please see [Module](/docs/main-concept/module) for more information about registering pipes into a module.

:::caution
Template pipes may throw a typescript type checking error since the pipe operator is originally an arithmetic operator that accepts any, number and bigint values.
A temporary fix for this is to set our values to type `any`.
Example. `const message: any = 'Hello World';`.
This error will be addressed in later releases.
:::

## Component services

To use services inside a component we need to register the services to the component using `providers` function.
After we register the service, we can now use it inside the component's logic and view.
We can use the `inject` function to inject the service to our component.

Please see [Services](./services) for more information about services.

Example.

```typescript
import { component, providers, inject } from '@monster-js/core';
import { GreetingService } from './greeting.service';

export function greeting() {

    const greetingService = inject(this, GreetingService);

    return <h1>{greetingService.getMessage()}</h1>
}

component(greeting, 'app-greeting');
providers(greeting, GreetingService);
```

Services can also be registered in a module so that it will be available to all the components registered in the module.

Please see [Module](/docs/main-concept/module) for more information about registering services into a module.
