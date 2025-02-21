# Building a Project

The `build` command in the Monster JS CLI allows you to prepare your project for production or generate standalone web components. This guide explains how to use the `build` command effectively.

## Syntax

```bash
mn build [options]
```

### Options:

* `--mode <mode>` (default: `development`): Specify the build mode. Available options are:
    * `development`
    * `production`
    * `none`
* `--standalone` (default: `false`): Build a component as a standalone web component.
* `--environment <env>` (default: `development`): Specify the environment configuration to use. Ex. `development` or `production`.
* `--output <path>` (default: `dist`): Specify the output directory for the build or the file path for a standalone component.

## Steps to Build a Project

### 1. Run the Command

Navigate to the root directory of your Monster JS project and execute the following command:

```bash
mn build
```

This creates a build of your project in the `dist` directory, optimized for `development` mode by default.

### 2. Specify the Build Mode

Use the `--mode` option to set the desired build mode:

```bash
mn build --mode production
```

This generates a production-ready build with optimizations such as minification and tree-shaking.

### 3. Build as a Standalone Component

If you want to build a single component as a standalone web component, use the `--standalone` option:

```bash
mn build --standalone
```

This outputs a standalone web component files that can be used independently in any web project.

Form more information about the standalone components follow this [link](/main-concept/standalone-component.md).

### 4. Customize the Output Path

Change the default output directory using the `--output` option. For example:

```bash
mn build --output build-output
```

This places the build files in the `build-output` directory.
<!-- 
## Example

To build a project in production mode and output it to a custom directory:

```bash
mn build --mode production --output production-build
``` -->

### 5. Using the Environment Option

The `--environment` option allows you to specify the environment configuration to be used during the build process. This is particularly useful when you have multiple environment files (e.g., `environment.development.ts`, `environment.production.ts`, `environment.staging.ts`) and you want to switch between them easily.

#### How It Works

When you use the `--environment` option, the Monster JS CLI automatically replaces the environment import in your code with the corresponding environment file. For example, if you specify `--environment staging`, the import statement:

```ts
import environment from './environments/environment.development';
```

Will be replaced with:

```ts
import environment from './environments/environment.staging';
```

This allows you to easily use different environment configurations without manually changing import statements.

#### File Replacement

Ensure your project environment is structured as follows:

```bash
src/
│   main.ts
│
└── environments/
    │   environment.development.ts
    │   environment.production.ts
    │   environment.staging.ts
```

You can customize the location of the environment files by modifying the `environmentsPath` property in the `monster.json` configuration file.

## What Happens Behind the Scenes

When you run the `build` command, the Monster JS CLI:

1. Compiles your project files.
2. Optimizes the output based on the selected mode.
3. Places the generated files in the specified output directory or file path.

## Need Help?

For detailed information about the `build` command and its options, run:

```bash
mn build --help
```

This will display the available options and their descriptions.

Build your Monster JS project with ease and confidence using the Monster JS CLI!
