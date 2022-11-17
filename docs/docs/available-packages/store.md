---
sidebar_position: 2
---

# Store

Store is a state management built for MonsterJS framework.
Using this store will help developers to centralize and maintain the codes easily.

The store is just an extension of [shared state](/docs/main-concept/state#shared-state).
The store is using the shared state behind the scene.
It is just a way to organize the data provided by the shared state functionality.

## Installation

We can install the store to our project using npm or yarn.

Example.

```bash
npm install @monster-js/store
```
or
```bash
yarn add @monster-js/store
```

## Create a store

To create a store, we can use the `createStore(<initial_state>)` function that accepts the initial state as the parameter.

Example.

```typescript title="store.ts"
import { createStore } from '@monster-js/store';

const initialState = { counter: 0 };

export const store = createStore(initialState);
```

Now we have an object that has a shared state properties.

## Initial state

It is a good practice to separate the initial state and create an interface that describe it.
The interface will be useful in the other parts of our store.

Example.

```typescript title="initial-state.ts"
export interface InitialState {
    counter: number;
}

export const initialState: InitialState = {
    counter: 0;
};
```

```typescript title="store.ts"
import { createStore } from '@monster-js/store';
import { initialState, InitialState } from './initial-state';

export const store = createStore<InitialState>(initialState);
```

## Using the store in a component

To use the store in a component, we just need to import the `store` that we just created above inside our component.

Example.

```typescript
import { component } from '@monster-js/core';
import { store } from './store';

export function app() {

    const [counter, setCounter] = store(this, 'counter');

    return <h1>App</h1>
}

component(app, 'app-root');
```

The same as shared state, we also get a getter(`counter`) and setter(`setCounter`) of the state.

## Getter

To get a value from store, we can call the getter function of the state.

Example.

```javascript
import { component } from '@monster-js/core';
import { store } from './store';

export function app() {

    const [counter, setCounter] = store(this, 'counter');

    return <h1>Count: {counter()}</h1>
}

component(app, 'app-root');
```

In the example above, the `counter` is the getter.

## Setter

When we set a new value to state of store.
The change will be reflected to the components that are using the state.

Example.

```typescript
import { component } from '@monster-js/core';
import { store } from './store';

export function app() {

    const [counter, setCounter] = store(this, 'counter');

    const clickMe = () => {
        setCounter(counter() + 1);
    }

    return <button on:click={clickMe}>Increment</button>
}

component(app, 'app-root');
```

The same as the share state, the setter has also a second parameter that accepts string that describes the action when using the setter.

## Subscribe to changes

Store also offers a way to subscribe for changes of each item of the state.

Example.

```javascript
import { component } from '@monster-js/core';
import { store } from './store';

export function app() {

    store(this, 'counter', (value) => {
        console.log(`The state is changed. New value: ${value}`);
    });

    return <h1>App</h1>
}

component(app, 'app-root');
```

This is a good option if we need to have some manipulation of the data before we send it to the local state of the component.

## Actions

One of the many advantages of using a store than shared state is that we can use actions in store.
Actions can also be used to update the state.
Using this can make your codes much cleaner and easy to manage and understand.

### Create actions

To create an action, we need to create an action creator first.

Using our example above, we need to create an action creator for the `counter` state.

Example.

```typescript title="counter.actions.ts"
import { actionCreator } from '@monster-js/store';
import { InitialState } from './initial-state';
import { store } from './store';

const counterActionCreator = actionCreator<InitialState>(store, 'counter');
```

After creating an action creator, we can now use it to create a real action.

Example.

```typescript title="counter.actions.ts"
import { actionCreator } from '@monster-js/store';
import { InitialState } from './initial-state';
import { store } from './store';

const counterActionCreator = actionCreator<InitialState>(store, 'counter');

export const incrementCounter = counterActionCreator<number, number>((state, payload) => {
    return state + payload;
}, 'Increment counter');
```

The `createActionCreator` has two arguments, first is the reducer and second is the action description.
The reducer has two parameters, first is the current state and second is the payload when using the `incrementCounter` in our component.
The payload is optional.
What ever the return value of the reducer will be the new state.

The `createActionCreator` has two generic types. First is the type of the state and second is the type of the payload.

### Dispatch an action

To dispatch an action, we just need to call the action inside our component or service.

Example.

```typescript
import { component } from '@monster-js/core';
import { incrementCounter } from './counter.actions';

export function app() {

    const [counter] = store(this, 'counter');

    const clickMe = () => {
        incrementCounter(1);
    }

    return <div>
        <h1>Count: {counter()}</h1>
        <button on:click={clickMe}>Increment</button>
    </div>
}

component(app, 'app-root');
```

## DevTools

We can also use the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to inspect the shared state of our application.
Using this DevTool will also enable us to use time travel debugging of our application.

DevTools is enabled by default in development mode.
Building the application for production will automatically remove the DevTools.
