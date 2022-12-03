import { ObjectInterface } from "../../../../interfaces/object.interface";
import { getConfig } from "../../../../utils/get-config";
import { generateFunctionComponent } from "./generate-function-component";
import { generatePureComponent } from "./generate-pure-component";
import { generateShadowFunctionComponent } from "./generate-shadow-function-component";
import { generateComponentStyle } from "./generate-style";
import { generateComponentTest } from "./generate-test";

export function generateComponent(name: string, options: ObjectInterface) {
    const config = getConfig();
    if (config) {

        if (options.pure) return generatePureComponent(name);

        if (!options.shadow) generateFunctionComponent(name);
        else generateShadowFunctionComponent(name, options.shadow);

        if (!options.noTest) generateComponentTest(name);

        generateComponentStyle(name);
    }
}
