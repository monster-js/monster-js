# Generating Files with Weco JS CLI

The Weco JS CLI provides powerful commands to quickly generate various types of files to streamline development. This guide explains the available commands and their usage.

## General Syntax

```bash
weco generate <type> <path>
```
or
```bash
weco g <short-type> <path>
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
* [Dependency Injection (DI) Container](/cli/generate-files?id=generate-a-di-container)
* [Environment](/cli/generate-files?id=generate-environment-files)

## Generate a Component

### Command:

```bash
weco generate component path/to/button
```
or
```bash
weco g c path/to/button
```

### Output:

Creates `path/to/button.component.tsx` with:

```tsx
import { component } from 'weco-js';

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
weco generate interface path/to/user
```
or
```bash
weco g i path/to/user
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
weco generate enum path/to/user-role
```
or
```bash
weco g i path/to/user
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
weco generate type path/to/response-status
```

or

```bash
weco g t path/to/response-status
```

### Output:

Creates `path/to/response-status.type.ts` with:

```ts
export type ResponseStatusType = null;
```

## Generate a Service

### Command:

```bash
weco generate service path/to/message
```

or

```bash
weco g s path/to/message
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
weco generate directive path/to/highlight
```

or

```bash
weco g d path/to/highlight
```

### Output:

Creates `path/to/highlight.directive.ts` with:

```ts
import { directive, DirectiveDataType } from 'weco-js';

function highlight(element: Element, data: DirectiveDataType) {
    return <element-outlet element={element} />;
}

export default directive(highlight, 'highlight');
```

## Generate an Event Emitter

### Command:

```bash
weco generate event-emitter path/to/toggle-sidebar
```

or

```bash
weco g ee path/to/toggle-sidebar
```

### Output:

Creates `path/to/toggle-sidebar.event.ts` with:

```ts
import { createEventEmitter } from 'weco-js';

export const toggleSidebarEvent = createEventEmitter();
```

## Generate Shared State

### Command:

```bash
weco generate shared-state path/to/user-list
```

or

```bash
weco g ss path/to/user-list
```

### Output:

Creates `path/to/user-list.state.ts` with:

```ts
export const userListState = createSharedState(null);
```

## Generate a DI Container

### Command:

```bash
weco generate di-container path/to/user-module
```

or

```bash
weco g dc path/to/user-module
```

### Output:

Creates `path/to/user-module.container.ts` with:

```ts
import { createDIContainer } from 'weco-js';

export const [userModuleDI, userModuleDIOverride] = createDIContainer();
```

## Generate Environment Files

### Default Environments:

```bash
weco generate environments
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
weco generate environment staging
```

or

```bash
weco g env staging
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
weco generate --help
```

