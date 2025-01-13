# Shadow DOM

Shadow DOM is a web standard that enables encapsulation of a component's structure, styles, and behavior. Weco JS supports creating Shadow DOM components easily with its `component` function. This documentation explains how to use Shadow DOM in Weco JS, style components, and handle content projection with slots.

## Creating a Shadow DOM Component

To create a Shadow DOM component in Weco JS, use the `component` function. The `shadowMode` option specifies whether the Shadow DOM is open or closed.

### Example

```tsx
import { component } from 'weco-js';

export function ButtonComponent() {
    return <h1>ButtonComponent</h1>;
}

component(ButtonComponent, {
    selector: 'app-button',
    shadowMode: 'open' // open or closed
});
```

### Explanation

* `selector`: Defines the custom element name (e.g., `<app-button>`).
* `shadowMode`: Determines the type of Shadow DOM. Set to `'open'` to allow external access to the shadow root.

When the component is rendered, its structure and behavior are encapsulated inside the Shadow DOM, ensuring isolation from the global DOM.

## Styling a Shadow DOM Component

To style a Shadow DOM component, import styles and pass them as the third argument to the `component` function. Weco JS will automatically create a `<style>` element within the Shadow DOM.

### Example

```tsx
import styles from './button.component.scss';
import { component } from 'weco-js';

export function ButtonComponent() {
    return <h1>ButtonComponent</h1>;
}

component(ButtonComponent, {
    selector: 'app-button',
    shadowMode: 'open'
}, styles);
```

### Explanation

* `styles`: Imported CSS or SCSS file.
* The provided styles are encapsulated in the Shadow DOM, ensuring they do not affect or get affected by the global styles.

## Content Projection

Content projection allows external content to be passed into a component's Shadow DOM. This is achieved using the `<slot>` element.

## Basic Content Projection

You can use a `<slot>` element to project content from the light DOM into the Shadow DOM.

### Example

```tsx
import { component } from 'weco-js';

export function CardComponent() {
    return (
        <div>
            <h1>CardComponent</h1>
            <slot></slot>
        </div>
    );
}

component(CardComponent, {
    selector: 'app-card',
    shadowMode: 'open'
});
```

### Usage

```tsx
<CardComponent>
    <p>This content is projected into the Card component.</p>
</CardComponent>
```

Output:

```tsx
<div>
    <h1>CardComponent</h1>
    <p>This content is projected into the Card component.</p>
</div>
```

## Named Slots

Named slots allow you to project specific content into designated areas within the Shadow DOM by assigning names to `<slot>` elements.

### Example

```tsx
import { component } from 'weco-js';

export function LayoutComponent() {
    return (
        <div>
            <header>
                <slot name="header"></slot>
            </header>
            <main>
                <slot name="content"></slot>
            </main>
            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
    );
}

component(LayoutComponent, {
    selector: 'app-layout',
    shadowMode: 'open'
});
```

### Usage

```tsx
<LayoutComponent>
    <h1 slot="header">Header Content</h1>
    <p slot="content">Main Content</p>
    <small slot="footer">Footer Content</small>
</LayoutComponent>
```

Output:

```tsx
<div>
    <header>
        <h1>Header Content</h1>
    </header>
    <main>
        <p>Main Content</p>
    </main>
    <footer>
        <small>Footer Content</small>
    </footer>
</div>
```

## Default Slot Content

If no content is provided for a slot, you can define fallback content within the <slot> element.

### Example

```tsx
import { component } from 'weco-js';

export function MessageComponent() {
    return (
        <div>
            <slot>Default message if none is provided.</slot>
        </div>
    );
}

component(MessageComponent, {
    selector: 'app-message',
    shadowMode: 'open'
});
```

### Usage

```tsx
<MessageComponent></MessageComponent>
```

Output:

```tsx
<div>
    Default message if none is provided.
</div>
```

## Best Practices

1. **Use Shadow DOM for Encapsulation**: Ensure that your component's structure and styles are isolated.
2. **Name Slots for Clarity**: Named slots make it easier to manage content projection in complex components.
3. **Provide Default Content**: Always include fallback content for slots to ensure usability.
4. **Leverage Scoped Styles**: Encapsulate styles within the Shadow DOM to avoid global style clashes.

By using Weco JS's Shadow DOM features, you can create robust, encapsulated, and reusable components with seamless content projection and styling.
