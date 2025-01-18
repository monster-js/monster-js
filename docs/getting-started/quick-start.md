# Quick Start Guide

**Monster JS** is a modern web framework for building fast, reactive web components without relying on a virtual DOM. By using reactive state management with watchers, Monster JS ensures your UI components are responsive and efficient. This guide will help you get started with creating and managing components in Monster JS.

## Installation

First, you'll need to install the Monster JS CLI tool to generate and manage your projects.

### Step 1: Install Monster CLI

```bash
npm install -g monster-js-cli
```

This command will globally install the `monster-js-cli`, which you can use to create new projects and run local development servers.

## Creating Your First Monster JS Project

### Step 2: Generate a New Project

Once you have the CLI installed, you can generate a new Monster JS project using the following command:

```bash
mn new <project-name>
```

This will create a new project with a default structure, including the following files:

* `tsconfig.json`: TypeScript configuration file.
* `package.json`: Defines the dependencies and scripts for your project.
* `index.html`: The HTML template for your application.
* `.gitignore`: Git ignore file.
* `monster.json`: Configuration file for the Monster JS application.
* `src/main.ts`: The entry point for your app.
* `src/styles.scss`: Global styles for your application.
* `src/types.d.ts`: Type definitions for your project, allowing you to define custom types and interfaces.
* `src/app/app.component.tsx`: The root component of your app.
* `src/app/app.component.scss`: Styles specific to the root component of your app.

### Step 3: Project Structure Overview

The generated `main.ts` will look like this:

```ts
import styles from './styles.scss';
import { defineComponent, defineStyles } from "monster-js";
import { AppComponent } from "./app/app.component";

defineStyles([styles]);

defineComponent(AppComponent);
```

The `AppComponent` component in app.component.tsx will look like this:
```tsx
import styles from './app.component.scss';
import { component } from "monster-js";

export function AppComponent() {
    return <h1>Monster JS App</h1>;
}

component(AppComponent, {
    selector: 'app-root'
}, styles);
```

### Step 4: Run the Development Server

To run the application locally, navigate to the root of the project and use the `mn serve` command. This starts a local development server and opens your app in the browser.

```bash
mn serve
```

### Step 5: Build for Production

To build your project for production, run the following command. This optimizes your app for deployment.

```bash
mn build --mode production
```

## Creating and Using Components

### Step 6: Define a Component

In Monster JS, components are functions that define the structure of your UI and manage state. Here’s how to define a simple **CounterComponent** component with state:

```tsx
import { createState, component } from 'monster-js';

export function CounterComponent() {
    const [count, setCount] = createState(this, 0); // Define component state

    return <div>
        <h1>Count: {count()}</h1>
        <button on:click={setCount(count() + 1)}>Increase</button>
    </div>
}

component(CounterComponent, {
    selector: 'app-counter'
});
```

In the above example, `createState` is used to create a reactive state for the `count`. Every time `count()` is updated, watchers automatically detect the change and update the UI to reflect the new state

### Step 7: Reactive Binding with Watchers

Monster JS uses reactive state with automatic updates. The example above already shows how the `CounterComponent` component updates when the state changes. The UI reacts immediately when `setCount` is called to update the state.

### Step 8: Lifecycle Hooks

Components in Monster JS support lifecycle hooks, allowing you to execute code when a component is connected, disconnected, attributes are changed, and more.

For example, you can use `connected` and `disconnected` hooks to manage side effects like timers:

```tsx
import { component, createState, connected, disconnected } from 'monster-js';

export function TimerComponent() {

    let interval;
    const [time, setTime] = createState(this, 0);

    // Lifecycle hook to start timer when component mounts
    connected(this, () => {
        interval = setInterval(() => {
            setTime(time() + 1);
        }, 1000);
    });

    // Lifecycle hook to clean up when component unmounts
    disconnected(this, () => clearInterval(interval));

    return <h1>Elapsed Time: {time()} seconds</h1>;
}

component(TimerComponent, {
    selector: 'app-timer'
});
```

In this example, the `connected` hook starts the timer when the component mounts, and the `disconnected` hook clears the interval when the component unmounts.

However, the `connected` hook is not required in this case because the interval can be set up directly when the component is initialized. The connected hook is only necessary if you need to run a function specifically when the component is already connected to the DOM.

Here’s the same example without using the `connected` hook:

```tsx
import { component, createState, disconnected } from 'monster-js';

export function TimerComponent() {

    const [time, setTime] = createState(this, 0);

    // Start the timer directly
    const interval = setInterval(() => {
        setTime(time() + 1);
    }, 1000);

    // Lifecycle hook to clean up when component unmounts
    disconnected(this, () => clearInterval(interval));

    return <h1>Elapsed Time: {time()} seconds</h1>;
}

component(TimerComponent, {
    selector: 'app-timer'
});
```

This approach works perfectly fine since the timer setup does not depend on the component being connected to the DOM. Use the `connected` hook only when specific logic must run after the component is connected.

### Step 9: Shared State Across Components

Monster JS allows you to share state across multiple components using `createSharedState`. This is useful when you need to maintain shared data that updates in real-time across different parts of your application.

#### Example Implementation

##### 1. Define the Shared State

The shared state is defined in a separate file so it can be imported and used in multiple components.

##### shared-state.ts
```ts
import { createSharedState } from 'monster-js';

export const countSharedState = createSharedState(0);
```

* **Explanation**: The `createSharedState` function initializes a reactive state with a value of `0` that can be shared across components.

##### 2. Display the Shared State

Create a component to display the current value of the shared state.

##### display-count.component.tsx

```tsx
import { component } from 'monster-js';
import { countSharedState } from './shared-state';

export function DisplayCountComponent() {
    const [count] = countSharedState(this);

    return <h2>Shared Count: {count()}</h2>
}

component(DisplayCountComponent, {
    selector: 'app-display-count',
});
```

##### 3. Update the Shared State

Create another component with a button to update the shared state.

##### update-count-button.component.tsx

```tsx
import { component } from 'monster-js';
import { countSharedState } from './shared-state';

export function UpdateCountButton() {
    const [count, setCount] = countSharedState(this);

    return <button on:click={setCount(count() + 1)}>Increase Shared Count</button>
}

component(UpdateCountButton, {
    selector: 'app-update-count',
});
```

### Step 10: Using Props in Components

You can also pass props to your components. This allows you to create reusable components with dynamic data.

##### greeting.component.tsx

```tsx
export function Greeting() {
    const props = createProps(this);

    return <h1>Hello, {props().name}!</h1>;
}
```

##### app.component.tsx

```tsx
import { Greeting } from './greeting.component';

export function AppComponent() {
    return (
        <div>
            <Greeting prop:name="John" />
        </div>
    );
}
```

## Conclusion

This guide provides an overview of how to set up and create components with Monster JS. You learned how to define components, handle state and props, and use lifecycle hooks for managing side effects. For advanced topics, such as routing and testing, or for more configuration details, refer to the full documentation.

Now that you have the foundation, you can build powerful, reactive applications with Monster JS! Happy coding!