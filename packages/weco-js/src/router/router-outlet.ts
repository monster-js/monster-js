import { createComponent } from "../template-engine/create-component";
import { RouterService } from "./router.service";

export function routerOutlet(
    classComponent: any,
    rawComponent: any,
    routerPath: string,
    redirectTo: string,
    pathMatch: 'full' | 'prefix',
    canActivate: any[],
    canDeactivate: any[],
    routerData: any,
) {
    const routerService = new RouterService();
    console.log(classComponent);

    const comment = document.createComment(' router ');
    const fragment = document.createDocumentFragment();

    fragment.appendChild(comment);

    routerService.addViewRoute({
        comment,
        elementCreator: () => createComponent(rawComponent),
        canActivate,
        canDeactivate,
        routerData,
        element: null,
        routerPath,
        pathMatch,
        redirectTo,
    });

    return fragment;
}
