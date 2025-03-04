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
import { generateClass } from './actions/generate-class';
import { generateDirective } from './actions/generate-directive';
import { generateEventEmitter } from './actions/generate-event-emitter';
import { generateSharedState } from './actions/generate-shared-state';
import { generateEnvironments } from './actions/generate-environments';
import { generateEnvironment } from './actions/generate-environment';
import { generateGuard } from './actions/generate-guard';

const program = new Command();

program
    .name("mn")
    .version(packageJson.version, "-v, --version");

program
    .command("new <project-name>")
    .description("create a new project with the specified name")
    .option("--install-packages", "install npm packages after setup", true)
    .option("--shadow-mode <mode>", "set the default shadow mode for components (open or closed)")
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
    .option("--environment <env>", "specify the environment configuration to use. Ex. development or production", 'development')
    .option("--output <path>", "the build output path of a project or the build output file of a standalone component", "dist")
    .action(buildProject);

const generate = program
    .command("generate")
    .alias('g')
    .description("generate Monster JS files like component, directives, services, and more");

    generate.command('component <name>')
    .alias('c')
    .description('Generate a new component file with the specified name and path.')
    .option('--shadow-mode <mode>', 'Specify the shadow DOM mode (open or closed)', '')
    .action(generateComponent);

    generate.command('interface <name>')
    .alias('i')
    .description('Generate a new interface file with the specified name and path.')
    .action(generateInterface);

    generate.command('enum <name>')
    .alias('e')
    .description('Generate a new enum file with the specified name and path.')
    .action(generateEnum);

    generate.command('type <name>')
    .alias('t')
    .description('Generate a new type file with the specified name and path.')
    .action(generateType);

    generate.command('class <name>')
    .alias('cl')
    .description('Generate a new javascript class file with the specified name and path.')
    .action(generateClass);

    generate.command('guard <name>')
    .alias('g')
    .description('Generate a new guard file with the specified name and path.')
    .action(generateGuard);

    generate.command('directive <name>')
    .alias('d')
    .description('Generate a new directive file with the specified name and path.')
    .action(generateDirective);

    generate.command('event-emitter <name>')
    .alias('ee')
    .description('Generate a new event emitter file with the specified name and path.')
    .action(generateEventEmitter);

    generate.command('shared-state <name>')
    .alias('ss')
    .description('Generate a new shared state file with the specified name and path.')
    .action(generateSharedState);

    generate.command('environments')
    .alias('envs')
    .description('Generate default environment files for development and production.')
    .action(generateEnvironments);

    generate.command('environment <type>')
    .alias('env')
    .description('Generate a custom environment file with the specified type.')
    .action(generateEnvironment);

program.parse(process.argv);
