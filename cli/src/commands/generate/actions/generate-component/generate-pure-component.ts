import { basename, resolve } from "path";
import { paths } from "../../../../paths";
import { camelToKebab } from "../../../../utils/camel-to-kebab";
import { fileExistsChecker } from "../../../../utils/file-exists-checker";
import { getConfig } from "../../../../utils/get-config";
import { kebabToCamelCase } from "../../../../utils/kebab-to-camel-case";
import { logCreate } from "../../../../utils/log-create";
import { readFile } from "../../../../utils/read-file";
import { writeFile } from "../../../../utils/write-file";

export function generatePureComponent(name: string) {
    const baseName = basename(name);
    const config = getConfig();
    const fullDirPath = resolve(process.cwd(), config?.appRootDir || '', name);
    const fullLogicPath = resolve(fullDirPath, `${baseName}.component.tsx`)


    // check if files don't exists
    // if yes, then throw an error
    if (fileExistsChecker(fullLogicPath, `Unable to create new file. ${fullLogicPath} file already exists.`)) {
        return;
    }


    // if not, create the files
    const camelCaseName = kebabToCamelCase(`-${baseName}`);
    const logic = readFile(paths.pureComponent)
        .replace(/__ComponentNameCamelCase__/g, camelCaseName)
        .replace(/__ComponentNameKebabCase__/g, camelToKebab(baseName));


    writeFile(fullLogicPath, logic);
    logCreate(fullLogicPath);
}

