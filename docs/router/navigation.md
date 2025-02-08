# Navigation

This page covers the methods of navigation in Monster JS, including how to create links that navigate to different routes and how to programmatically navigate based on user interactions or other conditions.

## 1. Creating Links for Navigation

In Monster JS, you can use the `router:link` directive to create links that navigate between routes. This works similarly to the standard HTML anchor (`<a>`) tag but is integrated with Monster JS’s routing system.

### Example: Basic Link Creation

You can create a navigation link by applying the `router:link` directive to an anchor (`<a>`) element:

```tsx
export function HomeComponent() {
    return <a router:link="/login">Go to login page</a>
}

component(HomeComponent, {
    selector: 'app-home',
    directives: [routerDirective]
});
```

* `router:link`: This directive links the anchor element to the route specified (`/login` in this case). When clicked, the application will navigate to the `/login` route.
* `routerDirective`: Before using the `router:link` directive, ensure that the `routerDirective` directive is included in the `directives` array of your component.

### Key Notes:

* Any element can act as a link by using the `router:link` directive.
* The navigation is handled by Monster JS's internal routing system, ensuring smooth transitions between pages without reloading the page.

## 2. Navigating Programmatically

Sometimes you may want to trigger navigation programmatically based on user actions or other dynamic conditions. Monster JS offers a `routerNavigate()` function to perform programmatic navigation.

### Example: Button Click Navigation

Here’s an example of how to navigate to another route when a button is clicked:

```tsx
export function HomeComponent() {
    const navigate = inject(routerNavigate);

    const onClick = () => {
        navigate('/login');
    };

    return <button on:click={onClick()}>Go to login page</button>;
}
```

* `navigate('/login')`: This function navigates to the `/login` route when the button is clicked.

### Key Notes:

* The `routerNavigate()` function can be triggered by any event, such as button clicks, form submissions, or even complex logic.
* Use this method when you need to control navigation programmatically, for example, after performing validation or based on user input.

## 3. Summary of Navigation Methods

| Method | Description | Example Usage |
| --- | --- | --- |
| `router:link` | Creates a link to a route. | `<a router:link="/path/to/route">Link</a>` |
| `routerNavigate()` | Programmatically navigates to a route. | `routerNavigate('/path/to/route')` |

Both methods provide flexible ways to navigate between routes in your Monster JS application, whether through user interaction with links or through programmatic control over navigation.

This documentation covers the core techniques for managing navigation in Monster JS. With these tools, you can create both static and dynamic navigation experiences in your application.
