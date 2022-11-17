---
sidebar_position: 13
---

# Custom Pipes

Custom pipes allow us to create reusable value transformers that can be used directly in the template or in logic of our components.

## Create a pipe

To create a custom pipe, we can use the [cli](/docs/cli/cli-what-is-cli) to automatically generate a pipe file with boilerplate codes or we can manually create a file and write the code from scratch.

The following code is an example of a working pipe codes but without functions yet.

```typescript
import { pipe } from '@monster-js/core';

export function lowercase(value: any, args: any[]): any {
    return value;
}

pipe(lowercase, 'lowercase')
```

In the example above, the `lowercase(value, args)` function will do the transformation of the value and what ever this function returns will be the transformed data.

| Params | Description |
| --- | --- |
| value | The value to be transformed. |
| args | The parameters of the pipe when used in the template or in logic. |

Example.

```typescript
import { pipe } from '@monster-js/core';

export function lowercase(value) {
    return value.toLowerCase();
}

pipe(lowercase, 'lowercase')
```
