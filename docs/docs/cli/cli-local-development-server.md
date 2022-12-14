---
sidebar_position: 4
---

# Local development server

MonsterJS CLI provides a command to start a local development server allowing us to see the changes we made in our project before making it live.

## Serve command

To start the local development server we can run the following command:

```bash
mn serve
```

The command above will start a development server in port `4000` and will use the `dev` environment variables.
Please see [environment variables](/docs/useful-topics/environment-variables) for more information about these variables.

When the server is running we can now view our project by pointing our browsers to `http://localhost:4000`.

## Command options

| Option | Description | Value type | Default |
| --- | --- | --- | --- |
| --env <value\> | Serve the project using the specified environment. | string | dev |
| --port <value\> | Set the port for the local development server. | number | 4000 |
| --mode <value\> | Serve the project in 'development', 'production', or 'none' mode. See [webpack mode](https://webpack.js.org/configuration/mode/) for more info about the different modes. | string | development |
| --open | Opens a browser when local development server is ready. | boolean | false |

Example.

```bash
mn serve --port 8080
```