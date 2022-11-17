import { ObjectInterface } from "../../../../interfaces/object.interface";
import { getConfig } from "../../../../utils/get-config";
import { generateClassComponent } from "./generate-class-component";
import { generateShadowClassComponent } from "./generate-shadow-class-component";
import { generateComponentStyle } from "./generate-style";
import { generateComponentTest } from "./generate-test";

export function generateComponent(name: string, options: ObjectInterface) {
    const config = getConfig();
    if (config) {

        if (!options.shadow) generateClassComponent(name);
        else generateShadowClassComponent(name, options.shadow);

        if (!options.noTest) generateComponentTest(name);

        generateComponentStyle(name);
    }
}
