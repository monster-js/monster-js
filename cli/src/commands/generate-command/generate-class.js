import Listr from "listr";
import chalk from "chalk";
import { createRequire } from "module";
import { basename, join, resolve } from "path";
import { writeFile } from "../../utils/write-file.js";
import { kebabToCamel } from "../../utils/kebab-to-camel.js";
import { directoryExists } from "../../utils/directory-exists.js";
import { logNotInRootError } from "../../utils/log-not-in-root-error.js";
import { overwriteFileConfirmation } from "../../utils/overwrite-file-confirmation.js";

export function generateClass(name) {
    const monsterJsonPath = resolve(process.cwd(), 'monster.json');
    const inConfigDir = directoryExists(monsterJsonPath);

    if (!inConfigDir) {
        return logNotInRootError();
    }
    
    doGenerateClass(monsterJsonPath, name);
}

async function doGenerateClass(monsterJsonPath, name) {
    const require = createRequire(import.meta.url);
    const config = require(monsterJsonPath);
    const outputPath = resolve(process.cwd(), config.rootDir, name);
    const baseName = basename(outputPath);
    const classContent = generateClassContent(baseName);
    const classPath = join(outputPath, `${baseName}.ts`);
    const isClassExists = directoryExists(classPath);
    const taskList = [];
    let writeClass = true;

    if (isClassExists) writeClass = await overwriteFileConfirmation(classPath);
    if (writeClass) taskList.push(createClassFile(classPath, classContent));

    (new Listr(taskList)).run();
}

function createClassFile(path, content) {
    const createTask = {
        title: `[${chalk.green('CREATE')}] ${path}`,
        task: () => writeFile(path, content)
    };

    return createTask;
}

function generateClassContent(name) {
    const camelCasedName = kebabToCamel(`-${name}`);
    const content = `export class ${camelCasedName} {
}
`;
    
    return content;
}