# Monster JS Router

The Monster JS Router is a powerful and flexible routing solution designed to simplify navigation and route management in your applications. It provides a declarative syntax for defining routes, managing route parameters, handling redirects, and guarding access to specific routes. With support for lazy loading, programmatic navigation, and a subscription model for route changes, Monster JS Router ensures seamless and efficient navigation for your users.

## Key Features

* **Declarative Routing**: Easily define routes and their components using a clean, intuitive syntax.
```tsx
<router-outlet component={HomeComponent} path="path/1" />
```
* **Lazy Loaded Routes**: Improve performance by loading components only when needed.
```tsx
<router-outlet component={import('./home.component').then(c => c.HomeComponent)} path="path/1" />
```
* **Route Parameters**: Define dynamic routes to handle parameters.
```tsx
<router-outlet component={HomeComponent} path="path/{id}" />
```
* **Redirects**: Simplify navigation by redirecting users to specific routes.
```tsx
<router-outlet path="path/1" redirect-to="/login" path-match="full" />
```
* **Link Creation**: Navigate to routes using intuitive link components.
```tsx
export function HomeComponent() {
    return <a router:link="/login">Go to login page</a>
}
```
* **Programmatic Navigation**: Dynamically navigate to routes in response to events.
```tsx
export function HomeComponent() {
    const navigate = inject(routerNavigate);

    const onClick = () => {
        navigate('/login');
    };

    return <button on:click={onClick()}>Go to login page</button>
}
```
* **Route Guards**: Protect routes with canActivate and canDeactivate guards.
```tsx
<router-outlet component={HomeComponent} path="path/1" can-activate={[canActivateGuard1]} />
```
* **Subscriptions**: Listen to route changes, parameters, and query parameters in real-time.
```tsx
routerChange(this, (routeParams, queryParams) => {
    console.log(routeParams, queryParams);
});
```

## Why Use Monster JS Router?
1. **Simplicity**: Define, manage, and navigate routes with minimal code.
2. **Performance**: Leverage lazy loading and optimized navigation techniques.
3. **Flexibility**: Handle complex routing scenarios with guards, parameters, and redirects.
4. **Extensibility**: Easily integrate with other Monster JS features and third-party libraries.
5. **Ease of Debugging**: Subscriptions and guards provide clear insights into route changes and access control.

The Monster JS Router is designed to work seamlessly in modern JavaScript frameworks, making it an ideal choice for building robust, scalable, and user-friendly applications.