import { InternalRouterService } from "./internal-router.service";
export function routerOutlet(rawComponent, routerPath, redirectTo, pathMatch, canActivate, canDeactivate, routerData) {
    const routerService = new InternalRouterService();
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
//# sourceMappingURL=router-outlet.js.map