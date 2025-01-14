# Local Development Server

The `serve` command in the Monster JS CLI allows you to start a local development server to test and debug your Monster JS project in real-time. This guide explains how to use the `serve` command effectively.

## Syntax

```bash
mn serve [options]
```

### Options:

* `--port <port>` (default: `4000`): Specify the port to run the development server on.
* `--mode <mode>` (default: `development`): Set the mode of the server. Available modes are:
    * `development`
    * `production`
    * `none`

## Steps to Start a Local Development Server

### 1. Run the Command

Navigate to the root directory of your Monster JS project and execute the following command:

```bash
mn serve
```

This will start the development server on the default port (`4000`) in `development` mode.

### 2. Customizing the Port

If you need the server to run on a specific port, use the `--port` option. For example:

```bash
mn serve --port 3000
```

This will start the server on port 3000.

### 3. Setting the Mode

Specify the mode using the `--mode` option. For example:

```bash
mn serve --mode production
```

This will start the server in `production` mode. The available modes influence how the project is served, such as enabling or disabling optimizations.

### 4. Combining Options

You can combine options as needed. For instance:

```bash
mn serve --port 8080 --mode none
```

## Example

To start a development server on port `5000` in `development` mode, run:

```bash
mn serve --port 5000 --mode development
```

To start a production server on the default port (`4000`), run:

```bash
mn serve --mode production
```

## What Happens Behind the Scenes

When you run the serve command, the Monster JS CLI:

1. Sets up a local server environment.
2. Watches your project files for changes and reloads the browser automatically.
3. Serves your project files based on the selected mode and port.

## Need Help?

For detailed information about the `serve` command and its options, run:

```bash
mn serve --help
```

This will display the available options and their descriptions.

Start your local development server today and watch your Monster JS project come to life!
