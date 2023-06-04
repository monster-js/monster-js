import Listr from "listr";
import chalk from "chalk";
import { createRequire } from "module";
import { basename, join, resolve } from "path";
import { writeFile } from "../../utils/write-file.js";
import { kebabToCamel } from "../../utils/kebab-to-camel.js";
import { directoryExists } from "../../utils/directory-exists.js";
import { logNotInRootError } from "../../utils/log-not-in-root-error.js";
import { overwriteFileConfirmation } from "../../utils/overwrite-file-confirmation.js";

export function generateService(name, options) {
    const monsterJsonPath = resolve(process.cwd(), 'monster.json');
    const inConfigDir = directoryExists(monsterJsonPath);

    if (!inConfigDir) {
        return logNotInRootError();
    }
    
    doGenerateService(monsterJsonPath, name, options);
}

async function doGenerateService(monsterJsonPath, name, options) {
    const require = createRequire(import.meta.url);
    const config = require(monsterJsonPath);
    const outputPath = resolve(process.cwd(), config.rootDir, name);
    const baseName = basename(outputPath);
    const serviceContent = generateServiceContent(baseName, options);
    const servicePath = join(outputPath, `${baseName}.service.ts`);
    const isServiceExists = directoryExists(servicePath);
    const taskList = [];
    let writeService = true;

    if (isServiceExists) writeService = await overwriteFileConfirmation(servicePath);
    if (writeService) taskList.push(createServiceFile(servicePath, serviceContent));

    (new Listr(taskList)).run();
}

function createServiceFile(path, content) {
    const createTask = {
        title: `[${chalk.green('CREATE')}] ${path}`,
        task: () => writeFile(path, content)
    };

    return createTask;
}

function generateServiceContent(name, options) {
    const camelCasedName = kebabToCamel(`-${name}`);
    const config = !options.singleton ? '' : `{
    singleton: true
}`;
    const content = `import { Service } from '@monster-js/core';

@Service(${config})
export class ${camelCasedName}Service {
}
`;
    
    return content;
}