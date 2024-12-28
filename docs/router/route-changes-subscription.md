# Route Changes Subscription

In Weco JS, you can subscribe to route changes to react to updates in the application's route. This enables you to track changes in route parameters, query parameters, or the route itself, allowing you to trigger specific actions or update the UI accordingly.

## 1. Subscribing to Route Changes

Weco JS provides an API to subscribe to route changes. This allows you to listen for any updates to the route and take action based on the new route, parameters, or query parameters.

### Example: Subscribing to Route Changes

You can subscribe to route changes using the `routeChange()` method. This method will notify you whenever the route changes, including updates to route parameters and query parameters.

```tsx
export function HomeComponent() {
    routeChange().subscribe(this, (routeParams, queryParams) => {
        console.log(routeParams, queryParams);
    });

    return <h1>Home Component</h1>;
}
```

* `routeChange()`: Subscribes to route changes, providing both `routeParams` and `queryParams` as arguments. When the route changes, the callback function is triggered with the updated route parameters and query parameters.

### Key Notes:

* The `routeChange()` method is ideal for tracking all types of route changes.
* You can use this subscription to update the state of your application based on the new route data.

## 2. Subscribing to Route Parameter Changes

Sometimes, you may want to subscribe specifically to changes in the route parameters (e.g., when navigating between different instances of a route with dynamic segments). The `routeParamChange()` method allows you to listen for changes in the route parameters.

### Example: Subscribing to Route Parameter Changes

```tsx
export function HomeComponent() {
    routeParamChange().subscribe(this, (routeParams) => {
        console.log(routeParams);
    });

    return <h1>Home Component</h1>;
}
```

* `routeParamChange()`: Subscribes to changes in the route parameters. It provides the updated `routeParams` whenever they change.

### Key Notes:

* This method is useful when you need to react specifically to changes in the dynamic segments of the route (e.g., `/path/{id}`).

## 3. Subscribing to Query Parameter Changes

In addition to route parameters, Weco JS allows you to subscribe to changes in query parameters using the `routeQueryParamChange()` method. This is useful when the query string in the URL is updated, but the route itself remains the same.

### Example: Subscribing to Query Parameter Changes

```tsx
export function HomeComponent() {
    routeQueryParamChange().subscribe(this, (queryParams) => {
        console.log(queryParams);
    });

    return <h1>Home Component</h1>;
}
```

* `routeQueryParamChange()`: Subscribes to changes in the query parameters. It provides the updated `queryParams` whenever the query string in the URL changes.

### Key Notes:

* Use this method when you need to track changes in query parameters independently of route changes.

## 4. Summary of Subscription Methods

| Method | Description | Example Usage |
| --- | --- | --- |
| `routeChange()` | Subscribes to all route changes, including route and query params | `routeChange().subscribe(this, (routeParams, queryParams) => {...})`
| `routeParamChange()` | Subscribes to changes in route parameters | `routeParamChange().subscribe(this, (routeParams) => {...})` |
| `routeQueryParamChange()` | Subscribes to changes in query parameters | `routeQueryParamChange().subscribe(this, (queryParams) => {...})` |

These methods allow you to track and react to different types of changes in your routes, enabling you to keep the application state in sync with the current route.

## 5. Unsubscribing from Route Changes

In Weco JS, unsubscribing from route change events is not necessary. The system automatically handles unsubscribing when the component is no longer connected to the DOM, preventing potential memory leaks.

This documentation covers the subscription methods available in Weco JS for tracking route changes. By using these subscriptions, you can react to changes in route parameters, query parameters, or the route itself, and take appropriate actions in your application.