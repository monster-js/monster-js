import Listr from 'listr';
import chalk from 'chalk';
import { execa } from 'execa';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { writeFile } from '../utils/write-file.js';
import { getFileContent } from '../utils/get-file-content.js';
import { directoryExists } from '../utils/directory-exists.js';
import { removeDirectory } from '../utils/remove-directory.js';
import { getAllFilePaths } from '../utils/get-all-file-paths.js';

export function newCommand(program) {
    program.command('new <name>')
        .description("Generate a component files")
        .action(newCommandAction);
}

async function newCommandAction(name) {
    const destination = resolve(process.cwd(), name);
    let taskList = [];

    if (directoryExists(destination)) {
        taskList = await projectNameExists(name, destination);
    } else {
        taskList = await createNewProject(name, destination);
    }

    (new Listr(taskList)).run();
}

async function projectNameExists(name, destination) {
    const overridePrompt = {
        type: 'confirm',
        message: `A folder named '${name}' already exists in this directory. Do you want to overwrite the directory?`,
        name: 'overwrite'
    };
    const response = await inquirer.prompt([overridePrompt]);

    if (response.overwrite) return overwriteDirectory(name, destination)
    else return cancelCreateProject();
}

function createNewProject(name, destination) {
    const currentFileName = fileURLToPath(import.meta.url);
    const currentDirName = dirname(currentFileName);
    const appAssetDir = resolve(currentDirName, '../../assets/app');
    const allAssetFilesDir = getAllFilePaths(appAssetDir);
    const taskList = allAssetFilesDir.map(assetFilePath => generateCreateFileTask(assetFilePath, appAssetDir, destination));
    const createNewProjectTask = {
        title: 'Create new project',
        task: () => new Listr(taskList, { concurrent: false })
    };
    const installPackagesTask = {
        title: 'Install packages',
        task: () => execa('npm', ['install'], { cwd: name })
    };

    return [
        createNewProjectTask,
        installPackagesTask
    ];
}

function generateCreateFileTask(assetFilePath, appAssetDir,  destination) {
    const shortFilePath = assetFilePath.replace(appAssetDir, '');
    const processPath = join(destination, shortFilePath);
    const assetFileContent = getFileContent(assetFilePath);
    const createFileTask = {
        title: `[${chalk.green('CREATE')}] ${processPath}`,
        task: () => new Promise(resolve => {
            writeFile(processPath, assetFileContent);
            setTimeout(() => resolve(), 200);
        })
    };
    
    return createFileTask;
}

function overwriteDirectory(name, destination) {
    const removeDirectoryTask = {
        title: 'Remove existing directory',
        task: () => removeDirectory(destination)
    };

    return [
        removeDirectoryTask,
        ...createNewProject(name, destination),
    ];
}

function cancelCreateProject() {
    const cancelTask = {
        title: 'Cancel creating a project',
        task: () => true
    };

    return [cancelTask];
}
