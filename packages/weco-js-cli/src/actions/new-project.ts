import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { error, info, success } from "../utils/logger";

interface NewProjectOptionsInterface {
    installPackages: boolean;
}

export function newProject(projectName: string, options: NewProjectOptionsInterface) {
    const projectPath = path.join(process.cwd(), projectName);
    const scaffoldPath = path.join(__dirname, "../project-scaffold");

    // Check if the project directory already exists
    if (fs.existsSync(projectPath)) {
        error(`Directory ${projectName} already exists.`);
        process.exit(1);
    }

    try {
        // Copy scaffold folder contents to the new project directory
        fs.cpSync(scaffoldPath, projectPath, { recursive: true });
        info(`New project '${projectName}' created.`);

        const templates = {
            "gitignore.template": ".gitignore",
            "npmrc.template": ".npmrc"
        };

        for (const [templateFile, targetFile] of Object.entries(templates)) {
            const sourceFile = path.join(scaffoldPath, templateFile);
            const destFile = path.join(projectPath, targetFile);

            if (fs.existsSync(sourceFile)) {
                fs.copyFileSync(sourceFile, destFile);
                fs.unlinkSync(path.join(projectPath, templateFile));
            } else {
                error(`${templateFile} not found in scaffold.`);
            }
        }

        // Run npm install if --install-packages is true
        if (!(options.installPackages === false)) {
            info('Installing npm packages...');
            execSync("npm install", { stdio: "inherit", cwd: projectPath });
            success('Packages installed successfully.');
        } else {
            info('Skipping package installation.');
        }
    } catch (error) {
        console.error('Error creating project:', error);
        process.exit(1);
    }
}
