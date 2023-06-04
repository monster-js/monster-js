import chalk from "chalk";

export function logNotInRootError() {
    console.log(`[${chalk.red('ERROR')}] This command must be run inside a MonsterJS project root directory.`);
}