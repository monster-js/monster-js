import { Subscription, afterInit, detectChanges, onDestroy } from "@monster-js/core";
import { InternalService } from "./internal.service";
import { RouteProps } from "./interfaces/route-props.interface";
import { evaluateRoutePath } from "./utils/evaluate-route-path";
import { navigate } from "./public_apis";

export function Route(props: RouteProps) {
    let element: HTMLElement;
    const comment = document.createComment('-- route --');
    const subscriptions: Subscription[] = [];
    const internalService = new InternalService();

    const evaluate = () => {
        const match = evaluateRoutePath(props);
        if (match) ifMatch();
        else ifNotMatch();
    }

    const ifNotMatch = async () => {
        if (!element) return;

        let canDeactivate = true;
        if(props.canDeactivate) {
            const promises: (boolean | Promise<boolean>)[] = [];
            props.canDeactivate.forEach(item => promises.push(item(props.data)));
            const response = await Promise.all(promises);
            canDeactivate = response.every(item => !!item);
        }

        if (canDeactivate) {
            element.remove();
            element = null!;
        }
    }

    const ifMatch = async () => {
        if (props.redirectTo) {
            const url = props.redirectTo;
            setTimeout(() => navigate(url));
            return;
        }

        if (!element) {
            let canActivate = true;
            if(props.canActivate) {
                const promises: (boolean | Promise<boolean>)[] = [];
                props.canActivate.forEach(item => promises.push(item(props.data)));
                const response = await Promise.all(promises);
                canActivate = response.every(item => !!item);
            }

            if (canActivate && props.element) {
                element = props.element();
                (element as any).routerParams = {};
                (element as any).routerOnRouteChangeHooks = [];
                comment.after(element);
            }

        }

        if (element) {
            populateParams();
        }
    }

    const getParams = () => {
        const params: { [key: string]: any; } = {};
        const path: string = props.path;
        const wPath = location.pathname;
        const pathArr = path.split('/').filter(item => !!item);
        const wPathArr = wPath.split('/').filter(item => !!item);
        pathArr.forEach((item, index) => {
            if (item.indexOf(':') === 0) {
                const key = item.substring(1);
                params[key] = wPathArr[index];
            }
        });
        return params;
    }

    const populateParams = () => {
        const params = getParams();
        let hasChanges = false;
        let tempElement: any = element;

        Object.keys(params).forEach(key => {
            if (tempElement.routerParams[key] !== params[key]) hasChanges = true;
        });
        tempElement.routerParams = params;

        tempElement.routerOnRouteChangeHooks.forEach((item: any) => item());
        if (hasChanges) {
            detectChanges(element);
        }
    };

    afterInit(this, () => {
        subscriptions.push(internalService.evaluate.subscribe(evaluate));
        evaluate();
    });

    onDestroy(this, () => subscriptions.forEach(subscription => subscription.unsubscribe()));

    return comment;
}
