"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newProject = newProject;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const logger_1 = require("../utils/logger");
const update_json_file_1 = require("../utils/update-json-file");
function newProject(projectName, options) {
    const projectPath = path_1.default.join(process.cwd(), projectName);
    const scaffoldPath = path_1.default.join(__dirname, "../project-scaffold");
    // Check if the project directory already exists
    if (fs_1.default.existsSync(projectPath)) {
        (0, logger_1.error)(`Directory ${projectName} already exists.`);
        process.exit(1);
    }
    try {
        // Copy scaffold folder contents to the new project directory
        fs_1.default.cpSync(scaffoldPath, projectPath, { recursive: true });
        (0, logger_1.info)(`New project '${projectName}' created.`);
        const templates = {
            "gitignore.template": ".gitignore",
            "npmrc.template": ".npmrc"
        };
        for (const [templateFile, targetFile] of Object.entries(templates)) {
            const sourceFile = path_1.default.join(scaffoldPath, templateFile);
            const destFile = path_1.default.join(projectPath, targetFile);
            if (fs_1.default.existsSync(sourceFile)) {
                fs_1.default.copyFileSync(sourceFile, destFile);
                fs_1.default.unlinkSync(path_1.default.join(projectPath, templateFile));
            }
            else {
                (0, logger_1.error)(`${templateFile} not found in scaffold.`);
            }
        }
        const { shadowMode } = options;
        if (shadowMode === 'open' || shadowMode === 'closed') {
            const configPath = path_1.default.join(projectPath, 'weco.json');
            (0, update_json_file_1.updateJsonFile)(configPath, (config) => {
                config.component.shadowMode = shadowMode;
                return config;
            });
            (0, logger_1.info)(`Set default shadow mode to '${shadowMode}'`);
        }
        // Run npm install if --install-packages is true
        if (!(options.installPackages === false)) {
            (0, logger_1.info)('Installing npm packages...');
            (0, child_process_1.execSync)("npm install", { stdio: "inherit", cwd: projectPath });
            (0, logger_1.success)('Packages installed successfully.');
        }
        else {
            (0, logger_1.info)('Skipping package installation.');
        }
    }
    catch (error) {
        console.error('Error creating project:', error);
        process.exit(1);
    }
}
//# sourceMappingURL=new-project.js.map