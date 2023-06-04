import chalk from 'chalk';
import open from 'open';

export function docsCommand(program) {
    program.command('docs')
        .description('This will open the official documentation of MonsterJS.')
        .action(async () => {
            const docsUrl = 'https://monster-js.org';
            await open(docsUrl);
            console.log(`[${chalk.green('OPEN')}] : ${docsUrl}`);
        });
}
