# Services

In Monster JS, services are a core feature that enables encapsulation of reusable business logic, allowing components and other services to access shared functions and resources seamlessly. Monster JS supports both **class-based services** and **function-based services**, which can be injected into other services or components.

## Creating a Service

In Monster JS, services can be created as either a class or a function. Both types of services can use dependency injection to utilize other services, promoting modular and maintainable code.

### 1. Class-based Services

Class-based services are structured as ES6 classes and often include methods and properties that maintain state or perform asynchronous operations. Here’s how to create and inject a class-based service.

```ts
// Example of a class-based service
class MessageService {

    public getMessage() {
        return 'Hello World!';
    }

}
```

### 2. Function-based Services

Alternatively, you can create a service as a function. This is helpful for lightweight or stateless services that do not need to maintain internal state.

```ts
// Example of a function-based service
function messageService() {
    return 'Hello World!';
}
```

## Injecting Services into Components

Monster JS makes it easy to inject services into components, whether they’re class-based or function-based. Here’s an example of how to inject and use `MessageService` in a component.

```tsx
import { inject, createState, afterViewInit } from 'monster-js';

function Component() {
    const [message, setMessage] = createState(this, ''); // State to hold the message
    const messageService = inject(MessageService); // Injecting MessageService

    afterViewInit(this, () => {
        const message = messageService.getMessage();
        setMessage(message); // Updating state with the message from MessageService
    });

    return <div>{message()}</div>; // Rendering the message
}
```

In this example:

* `createState` initializes a state variable to hold the message data.
* `MessageService` is injected and used to retrieve the message.
* Once the message is fetched, it is stored in the component’s state and rendered in the UI.

## Injecting Services into Other Services

Services in Monster JS can depend on other services, allowing for a layered architecture where services can be composed of smaller, reusable services.

```ts
// Example of a service that injects another service

class MessageService {
    private readonly httpService = inject(HttpService); // Injecting HttpService

    public async getMessage() {
        return await this.httpService.get('api/message');
    }
}

class AlertService {
    private readonly messageService = inject(MessageService); // Injecting MessageService

    public async showAlert() {
        const message = await this.messageService.getMessage(); // Fetch message from MessageService
        console.log(`Alert: ${message}`);
    }
}
```

In this example:

* The `AlertService` class injects `MessageService` to fetch a message, creating a dependency chain.
* This demonstrates how services can be layered or composed to perform more complex operations by reusing existing services.

## Summary

Services in Monster JS provide a powerful way to manage and share logic across components and other services. With both class-based and function-based options, you can choose the structure that best fits your needs.

## Key Features

* **Class-based Services**: Suitable for services with state or complex logic.
* **Function-based Services**: Lightweight and perfect for stateless, functional logic.
* **Dependency Injection**: Inject services into components or other services for maximum modularity.
