import { ObjectInterface } from "../../../../interfaces/object.interface";
import { getConfig } from "../../../../utils/get-config";
import { generateFunctionComponent } from "./generate-function-component";
import { generatePureComponent } from "./generate-pure-component";
import { generateShadowFunctionComponent } from "./generate-shadow-function-component";
import { generateComponentStyle } from "./generate-style";
import { generateComponentTest } from "./generate-test";

export function generateComponent(name: string, options: ObjectInterface) {

    if (!getConfig()) return;

    if (options.pure) {
        generatePureComponent(name);
        generateComponentStyle(name);
    } else if (!options.shadow) {
        generateFunctionComponent(name);
        generateComponentStyle(name);
        if (!options.noTest) generateComponentTest(name);
    } else {
        generateShadowFunctionComponent(name, options.shadow);
        generateComponentStyle(name);
        if (!options.noTest) generateComponentTest(name);
    }
}
