# Quick Start Guide

**Weco JS** is a modern web framework for building fast, reactive web components without relying on a virtual DOM. By using reactive state management with watchers, Weco JS ensures your UI components are responsive and efficient. This guide will help you get started with creating and managing components in Weco JS.

## Installation

First, you'll need to install the Weco JS CLI tool to generate and manage your projects.

### Step 1: Install Weco CLI

```bash
npm install -g weco-js-cli
```

This command will globally install the `weco-js-cli`, which you can use to create new projects and run local development servers.

## Creating Your First Weco JS Project

### Step 2: Generate a New Project

Once you have the CLI installed, you can generate a new Weco JS project using the following command:

```bash
weco new <project-name>
```

This will create a new project with a default structure, including the following files:

* `tsconfig.json`: TypeScript configuration file.
* `package.json`: Defines the dependencies and scripts for your project.
* `index.html`: The HTML template for your application.
* `.gitignore`: Git ignore file.
* `src/main.ts`: The entry point for your app.
* `src/app/app.component.tsx`: The root component of your app.

### Step 3: Project Structure Overview

The generated `main.ts` will look like this:

```ts
import { defineComponent } from "weco-js";
import { App } from "./app/app.component";

defineComponent('app-root', App);
```

The `App` component in app.component.tsx will look like this:
```tsx
export function App() {
    return <h1>Weco JS App</h1>;
}
```

### Step 4: Run the Development Server

To run the application locally, navigate to the root of the project and use the `weco serve` command. This starts a local development server and opens your app in the browser.

```bash
weco serve
```

### Step 5: Build for Production

To build your project for production, run the following command. This optimizes your app for deployment.

```bash
weco build --mode production
```

## Creating and Using Components

### Step 6: Define a Component

In Weco JS, components are functions that define the structure of your UI and manage state. Here’s how to define a simple **Counter** component with state:

```tsx
import { createState } from 'weco-js';

export function Counter() {
    const [count, setCount] = createState(this, 0); // Define component state

    return <div>
        <h1>Count: {count()}</h1>
        <button on:click={setCount(count() + 1)}>Increase</button>
    </div>
}
```

In the above example, `createState` is used to create a reactive state for the `count`. Every time `count()` is updated, the UI will automatically re-render to reflect the new state.

### Step 7: Reactive Binding with Watchers

Weco JS uses reactive state with automatic updates. The example above already shows how the `Counter` component updates when the state changes. The UI reacts immediately when `setCount` is called to update the state.

### Step 8: Lifecycle Hooks

Components in Weco JS support lifecycle hooks, which let you run code when a component is mounted or unmounted.

For example, you can use `connected` and `disconnected` hooks to manage side effects like timers:

```tsx
import { createState, connected, disconnected } from 'weco-js';

export function Timer() {
    const [time, setTime] = createState(this, 0);

    let interval;

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
```

In this example, the `connected` hook starts the timer when the component mounts, and the `disconnected` hook clears the interval when the component unmounts.

### Step 9: Shared State Across Components

Weco JS allows you to share state across multiple components using `createSharedState`. This is useful when you need to maintain shared data that updates in real-time across different parts of your application.

#### shared-state.ts

```ts
import { createSharedState } from 'weco-js';

export const countSharedState = createSharedState(0);
```

#### display-count.component.tsx

```tsx
import { countSharedState } from './shared-state';

export function DisplayCount() {
    const [count] = countSharedState(this);
    return <h2>Shared Count: {count()}</h2>;
}
```

#### update-count-button.component.tsx

```tsx
import { countSharedState } from './shared-state';

export function UpdateCountButton() {
    const [count, setCount] = countSharedState(this);

    return <button on:click={setCount(count() + 1)>Increase Shared Count</button>;
}
```

### Step 10: Using Props in Components

You can pass props to your components as function parameters. This allows you to create reusable components with dynamic data.

#### greeting.component.tsx

```tsx
export function Greeting() {
    const props = createProps(this);

    return <h1>Hello, {props().name}!</h1>;
}
```

#### app.component.tsx

```tsx
import { Greeting } from './greeting.component';

export function App() {
    return (
        <div>
            <Greeting prop:name="John" />
        </div>
    );
}
```

## Conclusion

This guide provides an overview of how to set up and create components with Weco JS. You learned how to define components, handle state and props, and use lifecycle hooks for managing side effects. For advanced topics, such as routing and testing, or for more configuration details, refer to the full documentation.

Now that you have the foundation, you can build powerful, reactive applications with Weco JS! Happy coding!