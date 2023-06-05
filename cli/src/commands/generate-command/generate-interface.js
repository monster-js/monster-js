import Listr from "listr";
import chalk from "chalk";
import { basename, join, resolve } from "path";
import { writeFile } from "../../utils/write-file.js";
import { kebabToCamel } from "../../utils/kebab-to-camel.js";
import { directoryExists } from "../../utils/directory-exists.js";
import { logNotInRootError } from "../../utils/log-not-in-root-error.js";
import { overwriteFileConfirmation } from "../../utils/overwrite-file-confirmation.js";
import { readFileSync } from "fs";

export function generateInterface(name) {
    const monsterJsonPath = resolve(process.cwd(), 'monster.json');
    const inConfigDir = directoryExists(monsterJsonPath);

    if (!inConfigDir) {
        return logNotInRootError();
    }
    
    doGenerateInterface(monsterJsonPath, name);
}

async function doGenerateInterface(monsterJsonPath, name) {
    const config = JSON.parse(readFileSync(monsterJsonPath));
    const outputPath = resolve(process.cwd(), config.rootDir, name);
    const baseName = basename(outputPath);
    const interfaceContent = generateInterfaceContent(baseName);
    const interfacePath = `${outputPath}.interface.ts`;
    const isInterfaceExists = directoryExists(interfacePath);
    const taskList = [];
    let writeInterface = true;

    if (isInterfaceExists) writeInterface = await overwriteFileConfirmation(interfacePath);
    if (writeInterface) taskList.push(createInterfaceFile(interfacePath, interfaceContent));

    (new Listr(taskList)).run();
}

function createInterfaceFile(path, content) {
    const createTask = {
        title: `[${chalk.green('CREATE')}] ${path}`,
        task: () => writeFile(path, content)
    };

    return createTask;
}

function generateInterfaceContent(name) {
    const camelCasedName = kebabToCamel(`-${name}`);
    const content = `export interface ${camelCasedName} {
}
`;
    
    return content;
}