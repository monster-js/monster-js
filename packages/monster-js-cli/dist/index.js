#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = __importDefault(require("../package.json"));
const new_project_1 = require("./actions/new-project");
const serve_project_1 = require("./actions/serve-project");
const build_project_1 = require("./actions/build-project");
const generate_component_1 = require("./actions/generate-component");
const generate_interface_1 = require("./actions/generate-interface");
const generate_enum_1 = require("./actions/generate-enum");
const generate_type_1 = require("./actions/generate-type");
const generate_service_1 = require("./actions/generate-service");
const generate_directive_1 = require("./actions/generate-directive");
const generate_event_emitter_1 = require("./actions/generate-event-emitter");
const generate_di_container_1 = require("./actions/generate-di-container");
const generate_shared_state_1 = require("./actions/generate-shared-state");
const generate_environments_1 = require("./actions/generate-environments");
const generate_environment_1 = require("./actions/generate-environment");
const program = new commander_1.Command();
program
    .name("mn")
    .version(package_json_1.default.version, "-v, --version");
program
    .command("new <project-name>")
    .description("create a new project with the specified name")
    .option("--install-packages", "install npm packages after setup", true)
    .option("--shadow-mode <mode>", "set the default shadow mode for components (open or closed)")
    .action(new_project_1.newProject);
program
    .command("serve")
    .description("start a local development server")
    .option("--port <port>", "specify the port to run the dev server on", "4000")
    .option("--mode <mode>", "specify the mode of the development server. Ex. development, production, or none", "development")
    .action(serve_project_1.serveProject);
program
    .command("build")
    .description("build the project for production")
    .option("--mode <mode>", "specify the build mode. Ex. development, production, or none", "development")
    .option("--standalone", "build a component as a web component", false)
    .option("--output <path>", "the build output path of a project or the build output file of a standalone component", "dist")
    .action(build_project_1.buildProject);
const generate = program
    .command("generate")
    .description("generate Monster JS files like component, directives, services, and more");
generate.command('component <name>')
    .description('Generate a new component file with the specified name and path.')
    .option('--shadow-mode <mode>', 'Specify the shadow DOM mode (open or closed)', '')
    .action(generate_component_1.generateComponent);
generate.command('interface <name>')
    .description('Generate a new interface file with the specified name and path.')
    .action(generate_interface_1.generateInterface);
generate.command('enum <name>')
    .description('Generate a new enum file with the specified name and path.')
    .action(generate_enum_1.generateEnum);
generate.command('type <name>')
    .description('Generate a new type file with the specified name and path.')
    .action(generate_type_1.generateType);
generate.command('service <name>')
    .description('Generate a new service file with the specified name and path.')
    .action(generate_service_1.generateService);
generate.command('directive <name>')
    .description('Generate a new directive file with the specified name and path.')
    .action(generate_directive_1.generateDirective);
generate.command('event-emitter <name>')
    .description('Generate a new event emitter file with the specified name and path.')
    .action(generate_event_emitter_1.generateEventEmitter);
generate.command('shared-state <name>')
    .description('Generate a new shared state file with the specified name and path.')
    .action(generate_shared_state_1.generateSharedState);
generate.command('di-container <name>')
    .description('Generate a new dependency injection container file with the specified name and path.')
    .action(generate_di_container_1.generateDiContainer);
generate.command('environments')
    .description('Generate default environment files for development and production.')
    .action(generate_environments_1.generateEnvironments);
generate.command('environment <type>')
    .description('Generate a custom environment file with the specified type.')
    .action(generate_environment_1.generateEnvironment);
program.parse(process.argv);
//# sourceMappingURL=index.js.map