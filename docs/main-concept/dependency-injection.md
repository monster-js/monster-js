# Dependency Injection

Dependency Injection (DI) in **Weco JS** enables components and services to share dependencies efficiently. Weco JS's DI system provides flexible configuration options and allows developers to manage dependencies as singletons or transient instances, improving code modularity and testability.

## Creating a Dependency Injection Container

In Weco JS, you can create a DI container using the `createDIContainer()` function, which returns two elements:

* `inject`: A function to retrieve dependencies within components. It can accept any data type, which is especially helpful for mocking values during testing.
* `setConfig`: A function to configure or override the DI container with specific dependency configurations.

## Default DI Container

Weco JS provides a default DI container, so you don’t need to create a new one if it isn’t necessary. You can simply use:

```ts
export const [inject, overrideProvider] = createDIContainer();
```

The `overrideProvider` function behaves like `setConfig`, allowing you to modify dependency configurations as needed.

## Basic Example

Here’s how to use the default DI container:

```ts
// Use the default DI container
export const [inject, overrideProvider] = createDIContainer();
```

With this container set up, you can inject dependencies into components using the `inject` function.

## Example: Injecting a Service into a Component

The following example demonstrates how to inject a `MessageService` into a component and use it:

```tsx
function Button() {
    const message = inject(MessageService); // Inject the MessageService

    const logMessage = () => {
        console.log(message.getMessage()); // Use the injected service
    }

    return <button on:click={logMessage()}>Log Message</button>
}
```

In this example:

* The `inject(MessageService)` call retrieves an instance of `MessageService` from the DI container.
* The `logMessage` function accesses the `getMessage()` method of `MessageService` and logs its return value when the button is clicked.

## Configuring Dependencies

The `setConfig` function allows you to configure how dependencies are provided within the DI container. By default, all services in Weco JS’s DI container are singletons, meaning they are instantiated once and shared across the application.

When creating the DI container, you can pass an array of configuration objects that control each dependency’s behavior. Each configuration object can have the following properties:

* `provide` (required): The dependency to be provided. This can be a class, function, or variable.
* `useValue`: A static value to use instead of the provided dependency. If this is specified, it overrides `provide`.
* `useClass`: A class to use in place of the provided dependency, enabling substitution or extension of classes.
* `singleton`: A boolean indicating if the dependency should be a singleton. Defaults to `true`, meaning dependencies are singletons by default.

## Example: Configuring Dependencies

The following example provides a custom `MessageService` and specifies it as a non-singleton, meaning a new instance is created each time it is injected:

```ts
export const [inject, setConfig] = createDIContainer([
    {
        provide: MessageService,
        useValue: { getMessage: () => "Hello world" }, // Override MessageService with a custom value
        singleton: false // Creates a new instance each time it's injected
    }
]);
```

In this example:

* `useValue` provides a custom `MessageService` with a specific `getMessage()` function.
* `singleton: false` overrides the default singleton behavior, creating a new instance each time `MessageService` is injected.

### Using useClass to Substitute Dependencies

The `useClass` option allows you to specify a class that will be instantiated instead of the original class provided. This is useful for substituting implementations while keeping the interface consistent.

#### Example: Substituting a Service with `useClass`

Suppose you have a `NotificationService` and want to replace it with a `MockNotificationService` for testing purposes. You can configure this substitution using `useClass`:

```tsx
class NotificationService {
    sendNotification(message: string) {
        console.log("Sending notification:", message);
    }
}

class MockNotificationService {
    sendNotification(message: string) {
        console.log("Mock notification:", message);
    }
}

// Create a DI container with NotificationService substituted by MockNotificationService
export const [inject, setConfig] = createDIContainer([
    {
        provide: NotificationService,
        useClass: MockNotificationService // Substitute NotificationService with MockNotificationService
    }
]);

function AlertComponent() {
    const notifier = inject(NotificationService);

    const alertUser = () => {
        notifier.sendNotification("Alert: Important update!"); // Calls MockNotificationService's method
    };

    return <button onClick={alertUser}>Send Alert</button>;
}
```

In this example:

* The `useClass: MockNotificationService` setting in `setConfig` ensures that `NotificationService` requests are fulfilled by `MockNotificationService`.
* When `inject(NotificationService)` is called in `AlertComponent`, it returns an instance of `MockNotificationService`, and `sendNotification` logs the mock message.

#### Extending Classes with useClass

You can also use `useClass` to provide an extended version of a service class, allowing you to add or modify functionality without changing the original class.

```ts
class EnhancedNotificationService extends NotificationService {
    sendNotification(message: string) {
        super.sendNotification(message);
        console.log("Enhanced: Notification also logged to database.");
    }
}

export const [inject, setConfig] = createDIContainer([
    {
        provide: NotificationService,
        useClass: EnhancedNotificationService // Use the extended service class
    }
]);

// Now, inject(NotificationService) will return an instance of EnhancedNotificationService.
```

In this setup:

* `NotificationService` is replaced with `EnhancedNotificationService`, which extends the original class and adds additional logging behavior.
* Any component that injects `NotificationService` will receive an instance of `EnhancedNotificationService` with the extended functionality.

## Overriding Dependency Configuration with setConfig

The `setConfig` function can be called separately to override existing configurations, which is particularly useful for testing.

### Example: Overriding Dependency Configuration in Unit Tests

```ts
// Override MessageService with a mock for testing
setConfig([
    {
        provide: MessageService,
        useValue: { getMessage: () => "Mock message" }
    }
]);
```

To clear all overridden configurations (such as at the end of a unit test), you can call `setConfig` with an empty array:

```ts
setConfig([]); // Clears all overrides
```

## Summary

Dependency Injection in Weco JS provides:

* **Flexible Configuration**: Customize dependencies using `provide`, `useValue`, `useClass`, and `singleton`.
* **Singleton Default**: All services are singletons by default, ensuring state consistency across the application unless `singleton: false` is specified.
* **Enhanced Testing**: Use setConfig to mock or override dependencies easily in unit tests.
* **Flexible Inject Support**: The `inject` function can accept any data type, which is beneficial for testing and mocking.

With Weco JS's DI system, managing shared dependencies becomes straightforward, improving modularity and facilitating a more testable codebase.
