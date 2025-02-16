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

### Active Link Styling

Monster JS provides the `router:link-active` and `router:link-active-match` attributes to help style active links dynamically.

`router:link-active="<active class name>"`

The `router:link-active` attribute allows you to specify a CSS class that should be applied when the link matches the current route.

#### Example

```tsx
export function HomeComponent() {
    return <a router:link="/login" router:link-active="active">Go to login page</a>
}
```

In this example, when the user is on the `/login` route, the active class will be added to the `<a>` element.

`router:link-active-match="<prefix | full>"`

By default, `router:link-active` applies the active class if the current route starts with the given path.

However, you can control this behavior using `router:link-active-match`:

* `prefix` (default): The active class is applied if the route starts with the specified path.
* `full`: The active class is applied only when the route exactly matches the specified path.

#### Example

```tsx
export function HomeComponent() {
    return <a router:link="/dashboard" router:link-active="active" router:link-active-match="full">Dashboard</a>
}
```

In this case, the `active` class will only be applied when the current route is exactly `/dashboard`, not when navigating to `/dashboard/settings`.

### Key Notes:

* Any element can act as a link by using the `router:link` directive.
* The navigation is handled by Monster JS's internal routing system, ensuring smooth transitions between pages without reloading the page.
* `router:link-active` helps dynamically style links based on the active route.
* `router:link-active-match` fine-tunes how the active class is applied.

## 2. Navigating Programmatically

Sometimes you may want to trigger navigation programmatically based on user actions or other dynamic conditions. Monster JS offers a `routerNavigate()` function to perform programmatic navigation.

### Example: Button Click Navigation

Here’s an example of how to navigate to another route when a button is clicked:

```tsx
export function HomeComponent() {
    const onClick = () => {
        routerNavigate('/login');
    };

    return <button on:click={onClick()}>Go to login page</button>;
}
```

* `routerNavigate('/login')`: This function navigates to the /login route when the button is clicked.

### Key Notes:

* The `routerNavigate()` function can be triggered by any event, such as button clicks, form submissions, or even complex logic.
* Use this method when you need to control navigation programmatically, for example, after performing validation or based on user input.

## 3. Summary of Navigation Methods

| Method | Description | Example Usage |
| --- | --- | --- |
| `router:link` | Creates a link to a route. | `<a router:link="/path/to/route">Link</a>` |
| `router:link-active` | Applies a CSS class when the link matches the current route. | `<a router:link="/route" router:link-active="active">Link</a>` |
| `router:link-active-match` | Specifies how to match the active route (`prefix` or `full`). | `<a router:link="/route" router:link-active="active" router:link-active-match="full">Link</a>` |
| `routerNavigate()` | Programmatically navigates to a route. | `routerNavigate('/path/to/route')` |

Both methods provide flexible ways to navigate between routes in your Monster JS application, whether through user interaction with links or through programmatic control over navigation.
