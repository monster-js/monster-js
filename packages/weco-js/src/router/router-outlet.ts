import { WatcherInterface } from "../interfaces/watcher.interface";
import { createComponent } from "../template-engine/create-component";
import { evaluateRoute } from "./evaluate-route";
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
    console.log(classComponent, redirectTo, canActivate, canDeactivate, routerData);
    const routerService = new RouterService();
    let routeParams: Record<string, string> = {};
    const elementCreator = () => createComponent(rawComponent);
    const valueGetter = (newUrl: string) => {
        routeParams = evaluateRoute(routerPath, newUrl, pathMatch);
        return !!routeParams;
    };

    const comment = document.createComment(' router ');
    const fragment = document.createDocumentFragment();
    let element: Element;
    const changeDetection: WatcherInterface = {
        hasChanges: false,
        value: undefined,
        getIsConnected: () => comment.isConnected,
        evaluate: async (newUrl: string) => {
            const newValue = valueGetter(newUrl);
            if (changeDetection.value !== newValue) {
                changeDetection.value = newValue;
                changeDetection.hasChanges = true;
            } else {
                changeDetection.hasChanges = false;
            }
        },
        handlerChange: (value: any) => {
            if (value) {
                element = elementCreator();
                comment.after(element);
            } else if (element) {
                element.remove();
                element = null;
            }
        }
    };

    fragment.appendChild(comment);
    routerService.addWatcher(changeDetection);

    return fragment;
}
