# Route Guards

Route guards in Weco JS allow you to control navigation by adding checks before a route is activated or deactivated. They are useful for tasks such as authentication, authorization, or preventing users from navigating away from a page that hasn't been saved.

This section covers how to define and apply route guards to protect routes and ensure that certain conditions are met before navigation occurs.

## 1. Introduction to Route Guards

Weco JS provides two types of guards:

* `canActivate`: A guard that determines whether a route can be activated.
* `canDeactivate`: A guard that determines whether a route can be deactivated.

You can apply one or both guards to a route to control the navigation flow based on specific conditions.

## 2. Defining Route Guards

Route guards are simple functions that return a boolean value or a promise that resolves to a boolean value. If the guard returns `true`, the navigation proceeds. If it returns `false` or a rejected promise, the navigation is blocked.

### Example: Simple `canActivate` Guard

```ts
export function canActivateGuard() {
    return true; // Allow navigation
}
```

* This guard always allows navigation by returning `true`.

### Example: Asynchronous `canActivate` Guard

```ts
export function canActivateGuard() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true); // Allow navigation after a delay
        }, 1000);
    });
}
```

* This guard is asynchronous and will delay the navigation until the promise resolves. If it resolves to `true`, the navigation is allowed; if it resolves to `false`, navigation is blocked.

### Example: `canDeactivate` Guard

```ts
export function canDeactivateGuard() {
    return confirm('Are you sure you want to leave this page?'); // Prompt the user before leaving
}
```

* This guard asks the user for confirmation before allowing them to leave the page. If the user cancels, navigation is blocked.

## 3. Applying Route Guards

You can apply guards to individual routes by specifying them in the `can-activate` and `can-deactivate` attributes of the route definition.

### Example: Applying `canActivate` and `canDeactivate` Guards

```tsx
<router-outlet 
    component={HomeComponent} 
    path="path/1" 
    can-activate={[canActivateGuard]} 
    can-deactivate={[canDeactivateGuard]} 
/>
```

* `can-activate`: This attribute accepts an array of guard functions that will be executed before the route is activated.
* `can-deactivate`: This attribute accepts an array of guard functions that will be executed before the route is deactivated.

### Key Notes:
* You can apply multiple guards by passing an array of functions to each attribute.
* If any of the guards return `false` or a rejected promise, the navigation will be blocked.

## 4. Passing Data to Guards

You can pass additional data to route guards via the `route-data` attribute in the route definition. This is useful when you need to provide context to the guard (e.g., user roles, current state).

### Example: Passing Data to Guards

```tsx
<router-outlet 
    component={HomeComponent} 
    path="path/1" 
    can-activate={[canActivateGuard]} 
    route-data={{ allowedRoles: ['admin'], currentUser: user }} 
/>
```

* `route-data`: The data you pass here will be available to the guards as an argument when they are executed.

### Example: Using Data in Guards

```ts
export function canActivateGuard(routeData: any) {
    if (routeData.allowedRoles.includes(routeData.currentUser.role)) {
        return true; // Allow navigation if the user has the correct role
    } else {
        return false; // Block navigation if the user doesn't have the correct role
    }
}
```

* This example uses the `routeData` to check if the current user has the correct role before allowing navigation.

## 5. Summary of Route Guards

| Guard Type | Description | Example Usage |
| --- | --- | --- |
| `canActivate` | Prevents or allows navigation to a route before it is activated. | `<router-outlet can-activate={[canActivateGuard]} />` |
| `canDeactivate` | Prevents or allows navigation away from a route before it is deactivated. | `<router-outlet can-deactivate={[canDeactivateGuard]} />` |

## 6. Best Practices

* Always ensure that your guards return a boolean or a promise that resolves to a boolean.
* Use asynchronous guards when the decision to allow or block navigation depends on external data or processes (e.g., authentication checks).
* Keep your guards simple and focused on their specific task to maintain clear and manageable code.
* When using the `canDeactivate` guard, be mindful of user experience. Asking for confirmation (e.g., "Are you sure you want to leave?") should only be done for critical actions that could result in data loss or unwanted side effects.

This documentation provides an overview of how to define and apply route guards in Weco JS, allowing you to control navigation based on conditions such as authentication, authorization, or user confirmation.
