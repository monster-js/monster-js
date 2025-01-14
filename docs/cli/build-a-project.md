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

## Example

To build a project in production mode and output it to a custom directory:

```bash
mn build --mode production --output production-build
```

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
