# Generating Files with Monster JS CLI

The Monster JS CLI provides powerful commands to quickly generate various types of files to streamline development. This guide explains the available commands and their usage.

## General Syntax

```bash
mn generate <type> <path>
```
or
```bash
mn g <short-type> <path>
```

## Supported File Types

* [Component](/cli/generate-files?id=generate-a-component)
* [Interface](/cli/generate-files?id=generate-an-interface)
* [Enum](/cli/generate-files?id=generate-an-enum)
* [Type](/cli/generate-files?id=generate-a-type)
* [Service](/cli/generate-files?id=generate-a-service)
* [Directive](/cli/generate-files?id=generate-a-directive)
* [Event Emitter](/cli/generate-files?id=generate-an-event-emitter)
* [Shared State](/cli/generate-files?id=generate-shared-state)
* [Environment](/cli/generate-files?id=generate-environment-files)

## Generate a Component

### Command:

```bash
mn generate component path/to/button
```
or
```bash
mn g c path/to/button
```

### Output:

Creates `path/to/button.component.tsx` with:

```tsx
import { component } from 'monster-js';

export function ButtonComponent() {
    return <h1>ButtonComponent</h1>;
}

component(ButtonComponent, {
    selector: 'app-button'
});
```

## Generate an Interface

### Command:

```bash
mn generate interface path/to/user
```
or
```bash
mn g i path/to/user
```

### Output:

Creates `path/to/user.interface.ts` with:

```ts
export interface UserInterface {
}
```

## Generate an Enum

### Command:

```bash
mn generate enum path/to/user-role
```
or
```bash
mn g i path/to/user
```

### Output:

Creates `path/to/user-role.enum.ts` with:

```ts
export enum UserRoleEnum {
}
```

## Generate a Type

### Command:

```bash
mn generate type path/to/response-status
```

or

```bash
mn g t path/to/response-status
```

### Output:

Creates `path/to/response-status.type.ts` with:

```ts
export type ResponseStatusType = null;
```

## Generate a Service

### Command:

```bash
mn generate service path/to/message
```

or

```bash
mn g s path/to/message
```

### Output:

Creates `path/to/message.service.ts` with:

```ts
export class MessageService {
}
```

## Generate a Directive

### Command:

```bash
mn generate directive path/to/highlight
```

or

```bash
mn g d path/to/highlight
```

### Output:

Creates `path/to/highlight.directive.ts` with:

```ts
import { directive, DirectiveDataType } from 'monster-js';

function highlight(element: Element, data: DirectiveDataType) {
    return <element-outlet element={element} />;
}

export default directive(highlight, 'highlight');
```

## Generate an Event Emitter

### Command:

```bash
mn generate event-emitter path/to/toggle-sidebar
```

or

```bash
mn g ee path/to/toggle-sidebar
```

### Output:

Creates `path/to/toggle-sidebar.event.ts` with:

```ts
import { createEventEmitter } from 'monster-js';

export const toggleSidebarEvent = createEventEmitter();
```

## Generate Shared State

### Command:

```bash
mn generate shared-state path/to/user-list
```

or

```bash
mn g ss path/to/user-list
```

### Output:

Creates `path/to/user-list.state.ts` with:

```ts
export const userListState = createSharedState(null);
```

## Generate Environment Files

### Default Environments:

```bash
mn generate environments
```

### Output:

Creates the following files:

* `environments/environment.production.ts`

* `environments/environment.development.ts`

#### Content:

##### environment.production.ts

```ts
export const environment = {
    mode: 'production',
};
```

##### environment.development.ts

```ts
export const environment = {
    mode: 'development',
};
```

### Custom Environment:

```bash
mn generate environment staging
```

or

```bash
mn g env staging
```

### Output:

Creates `environments/environment.staging.ts` with:

```ts
export const environment = {
    mode: 'development',
};
```

## Need Help?

For additional details on the `generate` command, run:

```bash
mn generate --help
```

