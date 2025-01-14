# Dependency Injection

Dependency Injection (DI) in **Monster JS** allows you to share dependencies across components and services seamlessly. Monster JS's DI system is flexible, supporting both singleton and transient instances, and it significantly improves code modularity, maintainability, and testability.

## Using the Default DI Container

The default DI container is ready for use as soon as you import it. This container simplifies dependency management without requiring additional setup.

### Example: Simplest Usage of the Default DI Container

```tsx
import { inject } from 'monster-js';

function App() {
    const messageService = inject(MessageService); // Retrieve MessageService from the default container

    return <h1>{messageService.getMessage()}</h1>;
}
```

In this example:
* The `inject(MessageService)` call retrieves an instance of `MessageService` from the default DI container.
* `MessageService` can now be used directly within the `App` component.

## Creating a Custom DI Container

To create a custom DI container, use the `createDIContainer()` function. This allows you to define custom configurations or use alternative variable names to avoid conflicts with the default container.

### Example: Simplest Custom DI Container Usage

```tsx
// custom-container.di.ts
import { createDIContainer } from 'monster-js';

// Create a new DI container
export const [customInject] = createDIContainer();

function App() {
    const messageService = customInject(MessageService); // Retrieve MessageService from the custom container

    return <h1>{messageService.getMessage()}</h1>;
}
```

In this example:
* `createDIContainer()` returns a custom `customInject` function.
* Services can be injected using `customInject`.

### Creating a Custom DI Container with Initial Configuration

The `createDIContainer()` function accepts an optional array of initial configurations for services, specifying their behavior within the container.

## Example: Custom DI Container with Configuration

```tsx
// custom-container.di.ts
import { createDIContainer } from 'monster-js';

// Create a custom DI container with an initial configuration
export const [customInject] = createDIContainer([
    {
        provide: MessageService,
        singleton: false, // Creates a new instance each time it's injected
    },
]);

function App() {
    const messageService = customInject(MessageService); // Retrieve a non-singleton instance

    return <h1>{messageService.getMessage()}</h1>;
}
```

In this example:
* `singleton: false` ensures that a new instance of `MessageService` is created each time it’s injected.

## Overriding Dependency Configurations

The `overrideProvider` function (for the default container) and `customSetConfig` function (for custom containers) allow you to dynamically change dependency configurations at runtime. This is particularly useful for testing or modifying application behavior without altering the core configuration.

### Example: Overriding the Default DI Container Configuration

```tsx
import { inject, overrideProvider } from 'monster-js';

// Override MessageService in the default container
overrideProvider([
    {
        provide: MessageService,
        useValue: { getMessage: () => "Overridden Message" }, // Provide a mock implementation
    },
]);

function App() {
    const messageService = inject(MessageService); // Retrieve the overridden service

    return <h1>{messageService.getMessage()}</h1>; // Displays: Overridden Message
}
```

### Example: Overriding a Custom DI Container Configuration

```tsx
// custom-container.di.ts
import { createDIContainer } from 'monster-js';

// Create a custom DI container
export const [customInject, customSetConfig] = createDIContainer();

// Override the configuration
customSetConfig([
    {
        provide: MessageService,
        useValue: { getMessage: () => "Custom Overridden Message" }, // Custom mock implementation
    },
]);

function App() {
    const messageService = customInject(MessageService); // Retrieve the overridden service

    return <h1>{messageService.getMessage()}</h1>; // Displays: Custom Overridden Message
}
```

In both cases:
* `useValue` provides a mock or alternative implementation for `MessageService`.
* Overrides apply globally within the container's scope, affecting all components that use the container.

## Available Configuration Properties
| Property | Purpose | Type |
| --- | --- | --- |
| `provide` | Specifies the dependency token or identifier. | `any` |
| `useValue` | Directly provides a pre-defined value or object. | `any` |
| `useClass` | Specifies the class to instantiate when the dependency is injected. | `constructor` |
| `singleton` | Determines if the dependency should be a singleton (shared instance) or transient (new). | `boolean` |

## Key Features of Monster JS DI
1. **Default DI Container**: Convenient and ready to use without extra setup.
2. **Custom DI Containers**: Flexible and configurable, avoiding naming conflicts.
3. **Initial Configurations**: Define behaviors (e.g., singleton or transient) during container creation.
4. **Runtime Overrides**: Dynamically change dependency behavior using `overrideProvider` or `customSetConfig`.
5. **Testability**: Easily mock dependencies for unit tests using the DI system.

With Monster JS’s DI, you can streamline your application's dependency management while maintaining flexibility and clarity.