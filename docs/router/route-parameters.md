# Route Parameters

Route parameters allow you to define dynamic segments in your application paths. These segments can capture variable parts of the URL and pass them to the corresponding component. In Monster JS Router, route parameters are defined using curly braces `{}` in the path.

## Defining Route Parameters

To define a route with parameters, use the following syntax:

```tsx
<router-outlet component={UserComponent} path="user/{id}" />
```

In this example, navigating to `/user/123` will render the `UserComponent` and pass `123` as the `id` parameter.

## Accessing Route Parameters

To access route parameters in your component, subscribe to route changes using the `routeChange` or `routeParamChange` function:

```tsx
export function UserComponent() {
    routeParamChange(this, (routeParams) => {
        console.log('Route Parameters:', routeParams);
    });

    return <h1>User Component</h1>;
}
```

In this example, the `routeParams` object will contain the parameter values, e.g., `{ id: '123' }` for the path `/user/123`.

## Multiple Route Parameters

You can define routes with multiple parameters by adding more curly-braced segments:

```tsx
<router-outlet component={OrderComponent} path="order/{orderId}/user/{userId}" />
```

Navigating to /order/456/user/123 will pass both orderId and userId as route parameters.

To access these parameters:

```tsx
export function OrderComponent() {
    routeParamChange(this, (routeParams) => {
        console.log('Order ID:', routeParams.orderId);
        console.log('User ID:', routeParams.userId);
    });

    return <h1>Order Component</h1>;
}
```

## Optional Parameters

To define optional parameters, you can omit them from the URL. Ensure your component handles the absence of these parameters gracefully:

```tsx
<router-outlet component={SearchComponent} path="search/{query?}" />
```

Here, `{query}` is optional. Navigating to `/search` or `/search/keyword` will both render the `SearchComponent`. In the first case, `query` will be undefined.

## Query Parameters

Monster JS Router also supports query parameters, which are appended to the URL after a `?`:

For example, `/user/123?active=true` includes a query parameter `active` with the value `true`.

To access query parameters:
```tsx
export function UserComponent() {
    routeQueryParamChange(this, (queryParams) => {
        console.log('Query Parameters:', queryParams);
    });

    return <h1>User Component</h1>;
}
```

The `queryParams` object will contain key-value pairs of all query parameters, e.g., `{ active: 'true' }`.

## Combining Route and Query Parameters

You can use both route and query parameters together:

```tsx
<router-outlet component={DetailsComponent} path="details/{id}" />
```

Navigating to `/details/456?view=summary` will provide both the `id` route parameter and the `view` query parameter.

Access them like this:

```tsx
export function DetailsComponent() {
    routerChange(this, (routeParams, queryParams) => {
        console.log('Route Parameters:', routeParams);
        console.log('Query Parameters:', queryParams);
    });

    return <h1>Details Component</h1>;
}
```

By leveraging route parameters, you can create dynamic and flexible routes in your Monster JS application. These parameters make it easy to build applications that adapt to variable inputs from the URL.
