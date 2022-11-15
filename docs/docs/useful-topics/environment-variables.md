---
sidebar_position: 2
---

# Environment variables

Environment variables helps us define static variables for our application.
It allows us to configure our project for different deployments without changing the codes inside our application.
We can define environment variables for production, development and even custom environment variables.

Whe we create our application there are two available environment variables provided for us.
If we check the `src/environments` directory, we can see that there is `environment.ts` and `environment.prod.ts`.

## Custom environment variables

To create a new environment variable, we just need to create a file named `environment.<env name>.ts`.
The `<env name>` is the one that is being used in the cli option `--env` like the following:

```bash
mn serve --env <env name\>
```

or when using webpack cli directly.

```bash
webpack serve --env environment=<env name\>
```

## Using environment in project

To use our environment variables inside our project we can just import the `src/environment/environment.ts` file.
The cli will be the one responsible to replace the value of the environment variables depending on the command.

Example.

```typescript
import { component } from '@monster-js/core';
import { environment } from './environments/environment';

export function app() {
    return <h1>Deployment: {environment.deployment}</h1>
}

component(app, 'app-root')
```

## Using environment in CLI

To use our environment variables in CLI, we just need to pass the environment name to the `--env` option in CLI commands.

Example, if we have environment variables like the following:

```
environments
    ├── environment.ts
    ├── environment.uat.ts
    └── environment.prod.ts
```

And we want to build our application using the `environment.uat.ts` environment.
Then we can use the following command:

```bash
mn build --env uat
```

## Using environment in webpack

To use our environment variables in webpack, we just need to pass the environment name to the `--env environment=<env name>` option in webpack cli command.

Example, if we have environment variables like the following:

```
environments
    ├── environment.ts
    ├── environment.uat.ts
    └── environment.prod.ts
```

And we want to build our application using the `environment.uat.ts` environment.
Then we can use the following command:

```bash
webpack --env environment=uat
```
