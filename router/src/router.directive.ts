import { DirectiveObject, FunctionComponent, Subscription, afterInit, createDirective, onDestroy, onViewChange } from "@monster-js/core";
import { watchDirective } from "./utils/watch-directive";
import { InternalService } from "./internal.service";
import { navigate } from './utils/navigate';
import { evaluateRoutePath } from "./utils/evaluate-route-path";

export function routerDirective(element: HTMLElement, directives: DirectiveObject, context: FunctionComponent) {

    const subscriptions: Subscription[] = []
    const internalService = new InternalService();
    const { link, linkActive, linkActiveExact } = directives;

    const active = (): void => {
        if (!linkActive || (element as any).routerLinkActiveSet) return;

        if (element.localName === "a") {
            (element as any).routerLinkActiveSet = true;
            subscriptions.push(internalService.onRouteChange.subscribe(checkRouterLinkActive));
            checkRouterLinkActive();
        }
    }

    const checkRouterLinkActive = () => {
        const href = link.get();
        const valueCaller = linkActive?.get || (() => '');
        const linkActiveExactCaller = linkActiveExact?.get;
        let exact = false;

        if (linkActiveExactCaller) {
            const linkActiveExactValue = linkActiveExactCaller();
            if (!!linkActiveExactValue || linkActiveExactValue === "") exact = true;
        }

        const ifMatch = evaluateRoutePath({
            path: href,
            element: () => {},
            exact
        });

        console.log(ifMatch, element, valueCaller(), linkActive.get);
        if (ifMatch) element.classList.add(valueCaller());
        else element.classList.remove(valueCaller());
    }

    if (link) {
        const valueCaller = link.get;
        const initialValue = valueCaller();

        element.addEventListener('click', event => {
            event.preventDefault();
            navigate(valueCaller());
        });

        if (element.localName === "a") {
            element.setAttribute("href", initialValue);
            watchDirective({ context, element, directive: link }, (newValue) => {
                element.setAttribute("href", newValue);
                active();
            });
        }
    }

    afterInit(context, () => active());
    onViewChange(context, () => active());

    onDestroy(
        context,
        () => subscriptions.forEach(item => item.unsubscribe()),
        () => element.isConnected
    );

    onViewChange(context, () => {
        if (!linkActive) return;
        checkRouterLinkActive();
    }, () => element.isConnected);

    return element;
}

createDirective(routerDirective, 'router');
