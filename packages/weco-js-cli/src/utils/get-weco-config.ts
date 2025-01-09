import * as fs from 'fs';
import * as path from 'path';
import { WecoConfigInterface } from '../interfaces/weco-config.interface';
import { error } from './logger';

export function getWecoConfig() {
    // Ensure the command is run at the root of a weco.js project
    const wecoJsonPath = path.join(process.cwd(), 'weco.json');
    if (!fs.existsSync(wecoJsonPath)) {
        console.log('');
        error('This command should run at the root of a weco js project.');
        return;
    }

    // Load the weco.json file
    const wecoConfig: WecoConfigInterface = JSON.parse(fs.readFileSync(wecoJsonPath, 'utf8'));
    return wecoConfig;
}