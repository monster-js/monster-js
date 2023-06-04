import inquirer from "inquirer";

export async function overwriteFileConfirmation(path) {
    const overridePrompt = {
        type: 'confirm',
        message: `A file ${path} already exists. Do you want to overwrite it?`,
        name: 'overwrite'
    };
    const response = await inquirer.prompt([overridePrompt]);

    return response.overwrite;
}
