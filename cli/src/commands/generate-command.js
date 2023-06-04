import { Option } from "commander";
import { generateComponent } from "./generate-command/generate-component.js";
import { generateService } from "./generate-command/generate-service.js";
import { generateGuard } from "./generate-command/generate-guard.js";
import { generateClass } from "./generate-command/generate-class.js";
import { generateInterface } from "./generate-command/generate-interface.js";
import { generateDirective } from "./generate-command/generate-directive.js";

export function generateCommand(program) {
    const generate = program.command('generate')
        .description('Generate MonsterJS files.');

    generate.command('component <name>')
        .description("Generate a MonsterJS component files.")
        .addOption(new Option('--shadow <shadow mode>', 'Generate shadow DOM component.').choices(['open', 'closed']))
        .action(generateComponent);

    generate.command("service <name>")
        .description("Generate a MonsterJS service files.")
        .option("--singleton", "Generate a singleton service.", false)
        .action(generateService);
    
    generate.command("guard <name>")
        .description("Generate a MonsterJS route guard files.")
        .action(generateGuard);
    
    generate.command("class <name>")
        .description("Generate a simple typescript class.")
        .action(generateClass);
    
    generate.command("interface <name>")
        .description("Generate a typescript interface to describe a data.")
        .action(generateInterface);
    
    generate.command("directive <name>")
        .description("Generate a MonsterJS directive file.")
        .action(generateDirective);
}