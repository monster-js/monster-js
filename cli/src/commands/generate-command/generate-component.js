import { createRequire } from "module";
import { basename, join, resolve } from "path"
import { writeFile } from "../../utils/write-file.js";
import { kebabToCamel } from "../../utils/kebab-to-camel.js";
import { directoryExists } from "../../utils/directory-exists.js";
import { logNotInRootError } from '../../utils/log-not-in-root-error.js';
import { overwriteFileConfirmation } from '../../utils/overwrite-file-confirmation.js';
import chalk from "chalk";
import Listr from "listr";

export function generateComponent(name, options) {
    const monsterJsonPath = resolve(process.cwd(), 'monster.json');
    const inConfigDir = directoryExists(monsterJsonPath);

    if (!inConfigDir) {
        return logNotInRootError();
    }
    
    doGenerateComponent(monsterJsonPath, name, options);
}

async function doGenerateComponent(monsterJsonPath, name, options) {
    const require = createRequire(import.meta.url);
    const config = require(monsterJsonPath);
    const outputPath = resolve(process.cwd(), config.rootDir, name);
    const baseName = basename(outputPath);
    const componentContent = !!options.shadow ? generateShadowLogic(baseName, options.shadow) : generateLogic(baseName);
    const logicPath = join(outputPath, `${baseName}.component.tsx`);
    const stylePath = join(outputPath, `${baseName}.component.scss`);
    const isLogicExists = directoryExists(logicPath);
    const isStyleExists = directoryExists(stylePath);
    const taskList = [];
    let writeLogic = true;
    let writeStyle = true;

    if (isLogicExists) writeLogic = await overwriteFileConfirmation(logicPath);
    if (isStyleExists) writeStyle = await overwriteFileConfirmation(stylePath);
    if (writeLogic) taskList.push(createComponentFile(logicPath, componentContent));
    if (writeStyle) taskList.push(createComponentFile(stylePath, ''));

    (new Listr(taskList)).run();
}

function createComponentFile(path, content) {
    const createTask = {
        title: `[${chalk.green('CREATE')}] ${path}`,
        task: () => writeFile(path, content)
    };

    return createTask;
}

function generateShadowLogic(name, shadowMode) {
    const camelCasedName = kebabToCamel(`-${name}`);
    const content = `import styles from './${name}.component.scss';
import { shadowComponent } from '@monster-js/core';

export function ${camelCasedName}() {
    return <h1>${camelCasedName} component</h1>
}

shadowComponent(${camelCasedName}, '${shadowMode}', styles);
`;
    
    return content;
}

function generateLogic(name) {
    const camelCasedName = kebabToCamel(`-${name}`);
    const content = `import styles from './${name}.component.scss';
import { component } from '@monster-js/core';

export function ${camelCasedName}() {
    return <h1>${camelCasedName} component</h1>
}

component(${camelCasedName}, styles);
`;
    
    return content;
}
