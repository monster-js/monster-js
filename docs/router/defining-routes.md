# Defining Routes

Defining routes in Weco JS Router is straightforward and intuitive. Routes are declared using the `<router-outlet />` component, which specifies the path and the component to render when the path is matched. This document explains the various ways to define routes in your Weco JS application.

## Basic Routes

To define a simple route, use the `component` property to specify the component to render and the `path` property for the route:
```tsx
<router-outlet component={HomeComponent} path="home" />
```
In this example, navigating to `/home` will render the `HomeComponent`.

## Lazy Loaded Routes
Lazy loading allows components to be loaded only when needed, improving application performance. You can define a lazy-loaded route as follows:
```tsx
<router-outlet component={import('./home.component').then(c => c.HomeComponent)} path="lazy-home" />
```
Here, the `HomeComponent` is loaded dynamically when the `/lazy-home` route is accessed.

## Route Parameters
Routes can include dynamic parameters to handle variable paths. Use curly braces `{}` to define parameters in the path:
```tsx
<router-outlet component={UserComponent} path="user/{id}" />
```
In this case, navigating to `/user/123` will render the `UserComponent` and provide `123` as the `id` parameter.

## Redirect Routes
Redirect routes allow you to automatically redirect users from one path to another. Use the `redirectTo` property to specify the target route, and the `pathMatch` property to define the matching strategy:
```tsx
<router-outlet path="old-home" redirectTo="/new-home" pathMatch="full" />
```
The pathMatch property can have the following values:
* `full`: Matches the entire URL.
* `prefix`: Matches the beginning of the URL.

> **Note** Place redirect routes at the top of their sibling routes to ensure they are evaluated first
```tsx
<router-outlet path="old-home" redirectTo="/new-home" pathMatch="full" />
<router-outlet component={NewHomeComponent} path="new-home" />
<router-outlet component={OtherComponent} path="other" />
```

## Route Order

The order of routes is important as routes are evaluated from top to bottom. Ensure that more specific routes are defined before generic ones to avoid conflicts.

For example:
```tsx
<router-outlet component={UserDetailsComponent} path="user/{id}" />
<router-outlet component={UserListComponent} path="user" />
```
In this case, `/user/123` will render the `UserDetailsComponent`, while `/user` will render the `UserListComponent`.

By following these guidelines, you can effectively define routes in your Weco JS application to ensure smooth navigation and optimal performance.
