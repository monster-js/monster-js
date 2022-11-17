---
sidebar_position: 11
---

# Custom directives

Custom directives are classes that manipulates an element in our MonsterJS application.

## Creating a custom directive

To create a custom directive, we can use the [cli](/docs/cli/cli-what-is-cli) to automatically generate a directive file with boilerplate codes or we can manually create a file and write the code from scratch.

The following code is an example of a working directive codes but without functionality yet.

```typescript
import { directive, AllDirectivesArg } from '@monster-js/core';

export function highlight(arg: AllDirectivesArg) {
}

directive(highlight, 'highlight')
```

The next step is to handle the directive by creating a condition to check if the directive exists.

Here is an example on how to handle the directive `highlight:color="red"`.

```typescript
import { directive, AllDirectivesArg } from '@monster-js/core';

export function highlight(arg: AllDirectiveArg) {
    const { color } = arg.directives;

    if (color) {
        arg.element.style.backgroundColor = color.get();
    }
}

directive(highlight, 'highlight');
```

## Register a directive

Before we can use a custom directive we need to register it to a module or component.

The following are examples on how to register a directive.

### In component

```typescript
import { component, directives } from '@monster-js/core';
import { customDirective1 } from './custom-directive1.directive';
import { customDirective2 } from './custom-directive2.directive';

export function greeting() {
    return <h1>Hello World!</h1>
}

component(greeting, 'app-greeting');
directives(greeting, customDirective1, customDirective2);
```

### In module

```typescript
import { Module } from '@monster-js/core/module';
import { customDirective1 } from './custom-directive1.directive';
import { customDirective2 } from './custom-directive2.directive';

export const AppModule: Module = {
    directives: [customDirective1, customDirective2]
};
```

## Using a directive

After the custom directive is registered, we can now use it like the built-in directives using the following syntax: `<namespace>:<name>="<value>"`.

```typescript
import { component, directives } from '@monster-js/core';
import { highlight } from './highlight.directive';

export function greeting() {
    return <h1 highlight:color="red">Hello World!</h1>
}

component(greeting, 'app-greeting');
directives(greeting, highlight);
```

## Value change watcher

To let our directive react when it's value is changed we can use the `watchDirective(arg, updateCallback)` function from the core package.

| Params | Description |
| --- | --- |
| arg               | The directive to be watched. |
| updateCallback    | A function that runs when the value of the directive is changed. |

Here's an example on how to change the background color of an element based on the value passed to its directive.

### The directive

```javascript
import { directive, watchDirective, AllDirectivesArg } from '@monster-js/core';

export function highlight(arg: AllDirectivesArg) {
    const { color } = arg.directives;

    if (color) {
        const initialValue = arg.directive.get();
        arg.element.style.backgroundColor = initialValue;

        watchDirective({
            element: arg.element,
            component: arg.component,
            directive: color
        }, value => {
            arg.element.style.backgroundColor = value;
        });
    }
}

directive(highlight, 'highlight')
```
### The component

```typescript
import { component, directives } from '@monster-js/core';
import { highlight } from './highlight.directive';

export function greeting() {

    highlightColor = 'red';

    render() {
        return <h1 highlight:color={this.highlightColor}>Hello World</h1>
    }
}

component(greeting, 'app-greeting');
directives(greeting, highlight);
```

We can also use the `watch(valueCaller, element, component, updateCallback)` function for a better control of our watcher.

| Params | Description |
| --- | --- |
| valueCaller       | A function that calls the value of the directive. |
| element           | The element where the directive is attached. |
| component         | The component where the directive is being used. |
| updateCallback    | A function that runs when the value of the directive is changed. |

Example.

```javascript
import { directive, watch, AllDirectivesArg } from '@monster-js/core';

export function highlight(arg: AllDirectivesArg) {
    const { color } = arg.directives;
    if (color) {
        const initialValue = color.get();
        arg.element.style.backgroundColor = initialValue;

        watch(() => color.get(), arg.element, arg.component, value => {
            arg.element.style.backgroundColor = value;
        });
    }
}

directive(highlight, 'highlight');
```

## Handling all directive names

In some cases we need to handle any names passed on our directive.

A good example for this is the props directive that accepts all directive names.
Example. `prop:user={this.user}` or `prop:post={this.post}` where `user` and `post` are the directive names.

To catch all the directive names we can just loop through the `arg.directives` property of the directive function parameter.

Example.

### The component

```typescript
import { component, directives } from '@monster-js/core';
import { animalDirective } from './animal.directive';

export function animals() {
    return <h1
        animal:cat="meow meow meow"
        animal:chicken="cluck cluck cluck"
    >Animal sounds</h1>
}

component(animals, 'app-animals');
directives(animals, animalDirective);
```

### The directive

```typescript
import { directive, AllDirectivesArg } from '@monster-js/core';

export function animalDirective(arg: AllDirectivesArg) {

    Object.keys(arg.directives).forEach(key => {
        console.log(`animal: ${key}, sound: ${arg.directives[key].get()}`);
    });

}

directive(animalDirective, 'animal')
```

The example above will log the following:

```typescript
'animal: cat, sound: meow meow meow'
'animal: chicken, sound: cluck cluck cluck'
```
