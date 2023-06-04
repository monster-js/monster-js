## What is MonsterJS?

MonsterJS is a JavaScript framework for building web applications or standalone components based on web components, which are suitable for encapsulating components and creating micro front-end apps.

This framework does not use virtual DOM; instead, it creates a watcher for each binding and updates it only when necessary. This feature is what makes it fast and gives it good client runtime performance and memory efficiency, even for large applications.

Official docs [https://monster-js.org](https://monster-js.org).

## Create a new project

To create a new project, you must install the MonsterJS CLI first.

To install the cli we just need to run the following command:

```bash
npm install -g @monster-js/cli
```

After installing the CLI, you can now start creating our new MonsterJS project by running the following command.

```bash
mn create <project-name>.
```

After the command is done, you can change directory to the project you just created and run

```bash
npm start
```

To start a local development server.

Wait for the command to finish and then navigate to [http://localhost:4000](http://localhost:4000) to access you local development server in the browser.
