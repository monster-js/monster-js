# Creating a New Project

The `new` command in the Monster JS CLI is designed to help you quickly set up a new Monster JS project with minimal effort. This guide walks you through the process of creating a new project using the CLI.

## Syntax

```bash
mn new <project-name> [options]
```

### Parameters:

* `<project-name>`: The name of the new project. This is required and will be used to create the project directory.

### Options:

* `--install-packages` (default: `true`): Automatically install npm packages after the project is set up.

## Steps to Create a New Project

### 1. Run the Command

Execute the following command in your terminal, replacing `<project-name>` with your desired project name:

```bash
mn new my-awesome-project
```

This will create a new directory named `my-awesome-project` and initialize the project structure within it.

### 2. Install Packages

By default, the CLI automatically installs the necessary npm packages after setting up the project. If you want to skip this step, you can disable it using the `--install-packages` flag:

```bash
mn new my-awesome-project --no-install-packages
```

In this case, you will need to manually install the dependencies later by navigating to the project directory and running:

```bash
npm install
```

### 3. Navigate to the Project Directory

Once the project is created, move into the project directory:

```bash
cd my-awesome-project
```

### 4. Start Developing

Your new Monster JS project is now ready! You can start the development server, build the project, or customize it further as needed.

## Example

To create a new project named `my-monster-app` and install all packages automatically, run:

```bash
mn new my-monster-app
```

To create the same project without installing packages automatically:

```bash
mn new my-monster-app --no-install-packages
```

## What Happens Behind the Scenes

When you create a new project using the `new` command, the Monster JS CLI:

1. Creates a new directory with the specified project name.
2. Sets up the necessary project structure and configuration files.
3. Installs npm packages if the --install-packages option is enabled.

## Need Help?

If you need assistance with the new command, you can access the help menu by running:

```bash
mn new --help
```

This will display detailed information about the command and its options.

Start building amazing projects with Monster JS CLI!

