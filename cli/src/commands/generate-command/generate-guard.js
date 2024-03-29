import Listr from "listr";
import chalk from "chalk";
import { basename, join, resolve } from "path";
import { writeFile } from "../../utils/write-file.js";
import { kebabToCamel } from "../../utils/kebab-to-camel.js";
import { directoryExists } from "../../utils/directory-exists.js";
import { logNotInRootError } from "../../utils/log-not-in-root-error.js";
import { overwriteFileConfirmation } from "../../utils/overwrite-file-confirmation.js";
import { readFileSync } from "fs";

export function generateGuard(name, options) {
    const monsterJsonPath = resolve(process.cwd(), 'monster.json');
    const inConfigDir = directoryExists(monsterJsonPath);

    if (!inConfigDir) {
        return logNotInRootError();
    }
    
    doGenerateGuard(monsterJsonPath, name, options);
}

async function doGenerateGuard(monsterJsonPath, name, options) {
    const config = JSON.parse(readFileSync(monsterJsonPath));
    const outputPath = resolve(process.cwd(), config.rootDir, name);
    const baseName = basename(outputPath);
    const guardContent = generateGuardContent(baseName);
    const guardPath = join(outputPath, `${baseName}.guard.ts`);
    const isGuardExists = directoryExists(guardPath);
    const taskList = [];
    let writeGuard = true;

    if (isGuardExists) writeGuard = await overwriteFileConfirmation(guardPath);
    if (writeGuard) taskList.push(createGuardFile(guardPath, guardContent));

    (new Listr(taskList)).run();
}

function createGuardFile(path, content) {
    const createTask = {
        title: `[${chalk.green('CREATE')}] ${path}`,
        task: () => writeFile(path, content)
    };

    return createTask;
}

function generateGuardContent(name) {
    const camelCasedName = kebabToCamel(name);
    const content = `export function ${camelCasedName}Guard(data: any): Promise<boolean> | boolean {
    return true;
}
`;
    
    return content;
}