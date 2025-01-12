# Styling

This document describes the styling conventions and mechanisms used in Weco JS applications. Weco JS provides flexibility with both global and component-based styles, ensuring maintainability and modularity in your projects.

## Global Styles

### Default Global Styles

Global styles are defined in the `src/styles.scss` file and are imported into the application's main entry point (`src/main.ts`). The default global styles are applied using the following setup:

```ts
import styles from './styles.scss';
import { defineComponent, defineStyles } from "weco-js";
import { App } from "./app/app.component";

defineStyles([styles]);

defineComponent('app-root', App);
```

### Adding Additional Global Styles

To add more global styles, include them in the array passed to `defineStyles`:

```ts
import additionalStyles from './additional-styles.scss';
defineStyles([styles, additionalStyles]);
```

### Lazy-Loaded Component Global Styles

Lazy-loaded components can define their own global styles, which are appended to the `<head>` only when the component is loaded:

```ts
import customGlobalStyles from './custom-global-styles.scss';
import { component, defineStyles } from 'weco-js';

defineStyles([customGlobalStyles]);

export function TestComponent() {
    return <h1>TestComponent</h1>;
}

component(TestComponent, {
    selector: 'app-test'
});
```

### Scope of Global Styles

Global styles apply to all components in the application, except for components using the Shadow DOM. Shadow DOM components are encapsulated and unaffected by global styles.

## Component-Based Styles

### Overview

Component-based styles are scoped to the component they are associated with. These styles do not affect parent or child components, ensuring isolation and modularity.

### File Naming Convention

Component styles must follow a specific naming convention, where the styles file shares the same name as the component file, differing only by extension:

* Component File: `button.component.tsx`
* Styles File: `button.component.scss`

### Applying Component Styles

Component styles are imported and passed as the third parameter to the `component` function:

```tsx
import styles from './button.component.scss';
import { component } from 'weco-js';

export function ButtonComponent() {
    return <h1>ButtonComponent</h1>;
}

component(ButtonComponent, {
    selector: 'app-button',
}, styles);
```

### Scope of Component Styles

Component styles apply only to the component in which they are defined. Other components in the application remain unaffected by these styles.

## Summary

* **Global Styles**: Found in `src/styles.scss` and applied globally unless overridden by Shadow DOM components. Additional global styles can be added dynamically.
* **Lazy-Loaded Global Styles**: Appended to the `<head>` only when the corresponding component is loaded.
* **Component-Based Styles**: Scoped to the component and do not affect other components. Follow the naming convention and pass styles explicitly in the `component` function.

Weco JS ensures a balance between global consistency and component modularity, allowing you to build scalable and maintainable applications.
