---
sidebar_position: 4
---

# Change detection

Change detection is a way to synchronize the data between component's logic and view.
It triggers when we set a value to a state and manually call the `detectChanges` function.

## Setting a state

We can create a state using `useState` function.
Please see [state](./state) documentation for more information about the state.

Example.

```typescript
import { component, useState } from '@monster-js/core';

export function counter() {

    const [count, setCount] = useState(this, 0);

    setInterval(() => setCount(count() + 1), 1000);

    return <h1>{count()}</h1>
}

component(counter, 'app-counter');
```

In the example above, we set a new value of the state using the `setCount` function and this will trigger change detection.

## Manually trigger change detection

In some cases, we may need to manually trigger change detection of a component.

To manually trigger change detection we just need to call the `detectChanges` function and pass the `this` context as argument.

Example.

```typescript
import { component, detectChanges } from '@monster-js/core';

export function counter() {

    setInterval(() => detectChanges(this), 1000);

    return <h1>{new Date()}</h1>
}

component(counter, 'app-counter')
```
