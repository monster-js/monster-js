## What is MonsterJS CLI

The MonsterJS CLI is an efficient and user-friendly command-line interface tool that is designed to simplify the process of creating new projects and generating MonsterJS files such as components, services, and more. Although it is not mandatory to use the CLI when building MonsterJS applications, utilizing this tool can offer great advantages to developers.

One of the key advantages of using the MonsterJS CLI is its ability to automate repetitive tasks, which saves a considerable amount of time and effort. With just a few simple commands, developers can create a new project or generate MonsterJS files without having to manually create and configure each file. This allows developers to focus on more important aspects of the application development process, such as writing code, debugging, and testing.

## Features

* [Initialize a project](https://monster-js.org/docs/cli/cli-create-application/)
* [Generate files like components, services, directives and more](https://monster-js.org/docs/cli/cli-generate-commands/)
* [Useful commands](https://monster-js.org/docs/cli/cli-useful-commands/)

## Installation

MonsterJS cli helps developers to create a working application out of the box. It has many useful commands like generating files for our MonsterJS app.

To install the cli we just need to run the following command:

```bash
npm install -g @monster-js/cli
```

After installing the cli, we can verify if the installation is successful by running the following command:

```bash
mn --version
```

If the installation is successful, it should display the version of the MonsterJS CLI installed on your machine.

We can find help with the CLI using the `mn --help` command.

After installing the CLI, we can now start creating our new MonsterJS project by running the command `mn create <project-name>`.

```bash
mn new my-app
```