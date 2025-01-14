# Installation Guide

**Monster JS** is a lightweight, reactive framework designed to simplify UI component development. This guide will walk you through installing the **Monster CLI** and creating your first project.

## Prerequisites

Before installing Monster JS, make sure you have the following tools set up on your system:

1. **Node.js**: Monster CLI requires Node.js. Download and install the latest LTS version of Node.js from the [official website](/). You can verify your Node.js installation with:

```bash
node -v
```

2. **npm or yarn**: The installation can be done with either npm (comes with Node.js) or yarn. Verify your package manager version with:

```bash
npm -v
```

or, if using yarn:

```bash
yarn -v
```

3. **Basic Command Line Knowledge**: Familiarity with basic command line operations will help you navigate and manage your Monster JS projects effectively.

Once you have these prerequisites installed, you’re ready to set up Monster JS.

## Step 1: Install the Monster CLI

The **Monster CLI** can be installed globally on your system via npm or yarn, allowing you to manage Monster projects efficiently.

### Installation with npm

If you’re using npm, run:

```bash
npm install -g monster-js-cli
```

Installation with yarn

```bash
yarn global add monster-js-cli
```

This command will install the Monster CLI globally, giving you access to the `mn` command to create, serve, and build projects.

## Step 2: Verify the Installation

After the installation completes, verify that the Monster CLI was installed successfully by checking its version:

```bash
mn --version
```

You should see the installed version of the Monster CLI if everything is set up correctly.

## Step 3: Create a New Monster JS Project

With the CLI installed, you’re ready to create a new Monster JS project. Run the following command, replacing `<project_name>` with your desired project name:

```bash
mn new <project_name>
```

For instance, to create a project called `my-monster-project`, use:

```bash
mn new my-monster-project
```

This command will scaffold a new Monster JS project in a folder named `my-monster-project`, setting up the necessary files and structure.

## Step 4: Navigate to Your Project

Once your project is created, navigate to the new project’s directory:

```bash
cd <project_name>
```

Replace `<project_name>` with the name you chose for your project.

## Step 5: Start the Development Server

Now that you’re inside your project directory, you can start the development server using the following command:

```bash
mn serve
```

This command will start a local development server, usually accessible at `http://localhost:3000`. You can view and interact with your Monster JS project in your browser, with automatic reloading on changes.

## Step 6: Building for Production

When you’re ready to deploy, build your project for production by running:

```bash
mn build --mode production
```

This command compiles and optimizes your Monster JS project for production, placing the output files in a `dist` folder within your project directory. By specifying `--mode production`, Webpack enables optimizations like minification, tree shaking, and dead code elimination, which helps reduce the size of your output files and improve performance for production environments.

## Next Steps

Congratulations! You’ve set up Monster JS and created your first project. Here are some suggested next steps:

* **Explore the Project Structure**: Familiarize yourself with the scaffolded files and directories.
* **Create Components**: Start building components to see Monster JS’s reactive and efficient UI updating in action.
* **Review the CLI Documentation**: Check out the full list of CLI commands and features in the [Monster CLI Documentation](/) to learn more.

With this setup, you’re ready to dive deeper into Monster JS and take advantage of its powerful, lightweight component system.
