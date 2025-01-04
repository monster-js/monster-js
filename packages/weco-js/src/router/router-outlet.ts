import { InternalRouterService } from "./internal-router.service";

export function routerOutlet(
    classComponent: any,
    rawComponent: () => Promise<any>,
    routerPath: string,
    redirectTo: string,
    pathMatch: 'full' | 'prefix',
    canActivate: any[],
    canDeactivate: any[],
    routerData: any,
) {
    const routerService = new InternalRouterService();
    console.log(classComponent);

    const comment = document.createComment(' router ');
    const fragment = document.createDocumentFragment();

    fragment.appendChild(comment);

    routerService.addViewRoute({
        comment,
        rawComponent,
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
