#! /usr/bin/env node

import { Command } from 'commander';
import { newCommand } from './commands/new-command.js';
import { generateCommand } from "./commands/generate-command.js";
import { docsCommand } from "./commands/docs-command.js";
import packageJson from '../package.json';

const program = new Command();

program.name('MonsterJS CLI')
    .description('A command-line interface to initialize, develop, scaffold, and maintain MonsterJS applications.')
    .version(packageJson.version);

newCommand(program);
generateCommand(program);
docsCommand(program);

program.parse();