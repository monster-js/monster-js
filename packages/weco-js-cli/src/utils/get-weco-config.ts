import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { WecoConfigInterface } from '../interfaces/weco-config.interface';

export function getWecoConfig() {
    // Ensure the command is run at the root of a weco.js project
    const wecoJsonPath = path.join(process.cwd(), 'weco.json');
    if (!fs.existsSync(wecoJsonPath)) {
        console.log('');
        console.log(`[${chalk.red('ERROR')}] This command should run at the root of a weco js project`);
        return;
    }

    // Load the weco.json file
    const wecoConfig: WecoConfigInterface = JSON.parse(fs.readFileSync(wecoJsonPath, 'utf8'));
    return wecoConfig;
}