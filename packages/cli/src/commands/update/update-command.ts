import { execSync } from "child_process";
import { Command } from "commander";

export function updateCommand(program:Command){
    program.command('update <name>')
    .description('this command is for update')
    .action((name:string) =>{
       try{
        const version = execSync(`npm view ${name} version`);
        console.log(`${name} latest version: ${version}`);

        console.log("Installing packages ...");
        execSync(`npm install ${name}`, {stdio: 'inherit'});
        console.log("Done");
       }
       catch(error){
        console.log(error);
       }
    });
}