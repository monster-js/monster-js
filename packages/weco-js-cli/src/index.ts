#!/usr/bin/env node

import { Command } from 'commander';
import packageJson from '../package.json';
import { newProject } from './actions/new-project';
import { serveProject } from './actions/serve-project';
import { buildProject } from './actions/build-project';

const program = new Command();

program
    .name("weco")
    .version(packageJson.version, "-v, --version");

program
    .command("new <project-name>")
    .description("create a new project with the specified name")
    .option("--install-packages", "install npm packages after setup", true)
    .action(newProject);

program
    .command("serve")
    .description("start a local development server")
    .option("--port <port>", "specify the port to run the dev server on", "3000")
    .option("--mode <mode>", "specify the mode of the development server. Ex. development, production, or none", "development")
    .action(serveProject);

program
    .command("build")
    .description("build the project for production")
    .option("--mode <mode>", "specify the build mode. Ex. development, production, or none", "development")
    .action(buildProject);

program.parse(process.argv);