import * as fs from 'fs';
import * as path from 'path';
import { MonsterConfigInterface } from '../interfaces/monster-config.interface';
import { error } from './logger';

export function getMonsterConfig() {
    // Ensure the command is run at the root of a monster.js project
    const monsterJsonPath = path.join(process.cwd(), 'monster.json');
    if (!fs.existsSync(monsterJsonPath)) {
        console.log('');
        error('This command should run at the root of a monster js project.');
        return;
    }

    // Load the monster.json file
    const monsterConfig: MonsterConfigInterface = JSON.parse(fs.readFileSync(monsterJsonPath, 'utf8'));
    return monsterConfig;
}