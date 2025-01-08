#!/usr/bin/env node

import { Command } from 'commander';
import packageJson from '../package.json';
import { newProject } from './actions/new-project';
import { serveProject } from './actions/serve-project';
import { buildProject } from './actions/build-project';
import { generateComponent } from './actions/generate-component';
import { generateInterface } from './actions/generate-interface';
import { generateEnum } from './actions/generate-enum';
import { generateType } from './actions/generate-type';
import { generateService } from './actions/generate-service';
import { generateDirective } from './actions/generate-directive';
import { generateEventEmitter } from './actions/generate-event-emitter';
import { generateDiContainer } from './actions/generate-di-container';
import { generateSharedState } from './actions/generate-shared-state';
import { generateEnvironments } from './actions/generate-environments';
import { generateEnvironment } from './actions/generate-environment';

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
    .option("--port <port>", "specify the port to run the dev server on", "4000")
    .option("--mode <mode>", "specify the mode of the development server. Ex. development, production, or none", "development")
    .action(serveProject);

program
    .command("build")
    .description("build the project for production")
    .option("--mode <mode>", "specify the build mode. Ex. development, production, or none", "development")
    .option("--standalone", "build a component as a web component", false)
    .option("--output <path>", "the build output path of a project or the build output file of a standalone component", "dist")
    .action(buildProject);

const generate = program
    .command("generate")
    .description("generate weco js files like component, directives, services, and more");

    generate.command('component <name>')
    .description('Generate a new component file with the specified name and path.')
    .action(generateComponent);

    generate.command('interface <name>')
    .description('Generate a new interface file with the specified name and path.')
    .action(generateInterface);

    generate.command('enum <name>')
    .description('Generate a new enum file with the specified name and path.')
    .action(generateEnum);

    generate.command('type <name>')
    .description('Generate a new type file with the specified name and path.')
    .action(generateType);

    generate.command('service <name>')
    .description('Generate a new service file with the specified name and path.')
    .action(generateService);

    generate.command('directive <name>')
    .description('Generate a new directive file with the specified name and path.')
    .action(generateDirective);

    generate.command('event-emitter <name>')
    .description('Generate a new event emitter file with the specified name and path.')
    .action(generateEventEmitter);

    generate.command('shared-state <name>')
    .description('Generate a new shared state file with the specified name and path.')
    .action(generateSharedState);

    generate.command('di-container <name>')
    .description('Generate a new dependency injection container file with the specified name and path.')
    .action(generateDiContainer);

    generate.command('environments')
    .description('Generate default environment files for development and production.')
    .action(generateEnvironments);

    generate.command('environment <type>')
    .description('Generate a custom environment file with the specified type.')
    .action(generateEnvironment);

program.parse(process.argv);