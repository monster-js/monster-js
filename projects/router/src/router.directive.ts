import { AllDirectivesArg, inject, onDestroy, watchDirective } from "@monster-js/core";
import { fromEvent, Subscription } from 'rxjs';
import { RouterService } from "./router.service";

export function routerDirective(args: AllDirectivesArg) {

    const subscriptions: Subscription[] = []
    const allDirectivesParam: AllDirectivesArg = args;
    const routerService = inject(args.component, RouterService);
    const { link } = args.directives;

    onDestroy(args.component, () => {
        subscriptions.forEach(item => item.unsubscribe());
    }, () => args.element.isConnected);

    const active = (): void => {
        const { directives, element } = allDirectivesParam;
        if (!directives["linkActive"]) return;

        if (element.localName === "a") {
            subscriptions.push(
                routerService.onRouteChange.subscribe(checkRouterLinkActive)
            );

            checkRouterLinkActive();
        }
    }

    active();

    const checkRouterLinkActive = () => {
        const { element, directives } = allDirectivesParam;
        const href = directives["link"].get();
        const valueCaller = directives["linkActive"].get;
        const pathname = location.pathname;
        const linkActiveExactCaller = directives["linkActiveExact"].get;
        let exact = false;

        if (linkActiveExactCaller) {
            const linkActiveExactValue = linkActiveExactCaller();
            if (!!linkActiveExactValue || linkActiveExactValue === "") {
                exact = true;
            }
        }

        if (!exact) {
            pathname.indexOf(href) === 0 ? element.classList.add(valueCaller()) : element.classList.remove(valueCaller());
        } else {
            pathname === href ? element.classList.add(valueCaller()) : element.classList.remove(valueCaller());
        }
    }

    if (link) {
        const valueCaller = link.get;
        const initialValue = valueCaller();

        fromEvent(args.element, 'click').subscribe(event => {
            event.preventDefault();
            routerService.navigate(valueCaller());
        });

        if (args.element.localName === "a") {
            args.element.setAttribute("href", initialValue);

            watchDirective({
                component: args.component,
                element: args.element,
                directive: link
            }, (newValue) => {
                args.element.setAttribute("href", newValue);
                active();
            });
        }
    }
}

routerDirective.namespace = 'router';
