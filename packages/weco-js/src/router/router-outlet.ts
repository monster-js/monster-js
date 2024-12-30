import { createComponent } from "../template-engine/create-component";
import { ifCondition } from "../template-engine/if-condition";

export function routerOutlet(
    classComponent: any,
    rawComponent: any,
    routerPath: string,
    redirectTo: string,
    pathMatch: string,
    canActivate: any[],
    canDeactivate: any[],
    routerData: any,
) {
    return ifCondition(classComponent, () => createComponent(rawComponent), () => true, ' router-outlet ');
}
