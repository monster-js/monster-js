---
sidebar_position: 9
---

# Lifecycle hooks

Lifecycle hooks are functions that lets you run a block of codes when your component triggers a lifecycle event.

## Available hooks

* `com` components
* `dir` directives
* `ser` services

| Hooks                                                                         | Description |
| ---                                                                           | --- |
| onInit() `com`                                                          | The first hook to run when the component is initialized. |
| beforeViewInit() `com`                                                  | This will be called before the view is build as dom elements. |
| afterViewInit() `com` `dir`                                       | This will be called after the view is built as dom elements. |
| onChangeDetection() `com` `dir`                                   | This is called every time the component's change detection runs. |
| onViewChange() `com` `dir`                                        | This will be called every time there are changes in view caused by change detection. |
| onDestroy() `com` `dir`                                           | This will be called when a component is destroyed. This is used for cleanup like unsubscribing all subscriptions. |
| onReceiveParent(parent: any) `ser`                                | This is called after a service or pipe is initialized. This is used when a service or pipe needs to access the parent instance where it is injected. |
| onReceiveConfig(config: any, container: Container) `ser`                  | This is called after a service is initialized. This is used when a service is designed to depend on a configuration after initialization. |
| adoptedCallback() `comp` `dir`                                     | A native web component hook. Called when a component is moved from one HTML document to another using the adoptNode(). This happens when we have `<iframe>` elements in a page. |
| attributeChangedCallback(name: string, oldValue: any, newValue: any) `com` `dir` | A native web component hook. Called when an observed attribute has been added, removed or changed. |
| onPropsChange() `com`                                             | Called when there are changes to component's props. |

## Hooks usage

Here are some examples on how to use the hooks in component, service and directive

### In component

```typescript
import { component, onInit, onDestroy } from '@monster-js/core';

export function greeting() {

    onInit(this, () => {
        console.log('I am in onInit hook');
    });

    onDestroy(this, () => {
        console.log('I am in onInit hook');
    });

    return <h1>Greeting<h1>
}

component(greeting, 'app-greeting');
```

### In service

```typescript
import { Service, OnReceiveParent, OnReceiveConfig } from '@monster-js/core';

@Service()
export class GreetingService implements OnReceiveParent, OnReceiveConfig {

    onReceiveParent(parent: any) {
        console.log('Hi!, I am in onReceiveParent hook');
    }

    onReceiveConfig(config: any, container: Container) {
        console.log('Hi!, I am in onReceiveConfig hook');
    }

}
```

### In directive

```typescript
import { directive, afterViewInit, onDestroy } from '@monster-js/core';

export function highlight(arg: AllDirectivesArg) {

    afterViewInit(this, () => {
        console.log('Hi!, I am in afterViewInit hook');
    });

    onDestroy(this, () => {
        console.log('Hi!, I am in onDestroy hook');
    });

}

directive(highlight, 'highlight');
```
