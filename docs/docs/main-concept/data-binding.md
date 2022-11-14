---
sidebar_position: 5
---

# Data binding

Data binding is a way to synchronize the data of logic and view.
This means that when the data is changed in logic, view gets updated, and when the user change some values in the view, data in logic will be updated.

## Attribute binding

Here is an example on how to bind a property from the logic into an element attribute:

```typescript
import { component, useState } from '@monster-js/core';

export function app() {

    const [id, setId] = useState(this, 0);

    setInterval(() => setId(id() + 1), 1000);

    return <h1 id={id()}>App component.</h1>
}

component(app, 'app-root')
```

In the example above, the id of h1 element will increment every second.
This is an example of one way binding.

## Text binding

Here is an example on how to bind a component property to view:

```typescript
import { component, useState } from '@monster-js/core';

export function greeting() {

    const [counter, setCounter] = useState(this, 0);

    setInterval(() => setCounter(counter() + 1), 1000);

    return <h1>{counter()}</h1>
}

component(greeting, 'app-greeting')
```

In the example above, the counter will increment every second and display the changes as a text in view.
This is another example of one way binding.

## Model binding

Model binding is a two way binding of data.
It uses the `v:model` directive.
Every time the model is changed from the view, the value in logic will be updated and the same thing will happen in the view when the model is updated from the logic.

Example.

```typescript
import { component, useState } from '@monster-js/core';

export function app() {

    const model = useState(this, 'Hello world!');
    const [getter] = model;

    return <div>
        <h1>{getter()}</h1>
        <input v:model={model} type="text" />
    </div>
}

component(app, 'app-root')
```

This is an example of two way binding.