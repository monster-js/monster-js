import Listr from "listr";
import chalk from "chalk";
import { createRequire } from "module";
import { basename, join, resolve } from "path";
import { writeFile } from "../../utils/write-file.js";
import { kebabToCamel } from "../../utils/kebab-to-camel.js";
import { directoryExists } from "../../utils/directory-exists.js";
import { logNotInRootError } from "../../utils/log-not-in-root-error.js";
import { overwriteFileConfirmation } from "../../utils/overwrite-file-confirmation.js";

export function generateDirective(name) {
    const monsterJsonPath = resolve(process.cwd(), 'monster.json');
    const inConfigDir = directoryExists(monsterJsonPath);

    if (!inConfigDir) {
        return logNotInRootError();
    }
    
    doGenerateDirective(monsterJsonPath, name);
}

async function doGenerateDirective(monsterJsonPath, name) {
    const require = createRequire(import.meta.url);
    const config = require(monsterJsonPath);
    const outputPath = resolve(process.cwd(), config.rootDir, name);
    const baseName = basename(outputPath);
    const directiveContent = generateDirectiveContent(baseName);
    const directivePath = join(outputPath, `${baseName}.directive.ts`);
    const isDirectiveExists = directoryExists(directivePath);
    const taskList = [];
    let writeDirective = true;

    if (isDirectiveExists) writeDirective = await overwriteFileConfirmation(directivePath);
    if (writeDirective) taskList.push(createDirectiveFile(directivePath, directiveContent));

    (new Listr(taskList)).run();
}

function createDirectiveFile(path, content) {
    const createTask = {
        title: `[${chalk.green('CREATE')}] ${path}`,
        task: () => writeFile(path, content)
    };

    return createTask;
}

function generateDirectiveContent(name) {
    const camelCasedName = kebabToCamel(`${name}`);
    const content = `import { FunctionComponent, createDirective, DirectiveObject } from "@monster-js/core";

export function ${camelCasedName}Directive(element: HTMLElement, directives: DirectiveObject, context: FunctionComponent) {
    return element;
}

createDirective(${camelCasedName}Directive, '${name}');
`;
    
    return content;
}