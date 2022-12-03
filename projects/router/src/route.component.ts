import { component, Container, FunctionComponent, getSelector, ifCondition, onDestroy, onInit, renderChild, useState, viewProps } from "@monster-js/core";
import { bootstrap, Module } from "@monster-js/core/module";
import { Route } from "./interfaces/route.interface";
import { Subscription } from "./interfaces/subscription.interface";
import { InternalService } from "./internal.service";
import { evaluateRoutePath } from "./utils/evaluate-route-path";
import { fakeDefineComponent } from "./utils/fake-define-component";

export function route(props: Route): HTMLElement {

    let guardRegistered: boolean = false;
    let container: Container = null;
    const subscriptions: Subscription[] = [];
    const internalService = new InternalService();

    const [ isActive, setIsActive ] = useState(this, false);
    const [ selector, setSelector ] = useState<string>(this);

    const paramCaller = () => {
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
    };


    onInit(this, () => {
        subscriptions.push(internalService.evaluate.subscribe(evaluate));
        evaluate();
    });

    onDestroy(this, () => subscriptions.forEach(subscription => subscription.unsubscribe()));


    const processGuard = async (method: 'canActivate' | 'canDeactivate'): Promise<boolean> => {
        const guards = props.guards || [];
        let checkResult = true;
        for (const guard of guards) {
            const instance = container.resolve<{ [key: string]: any; }>(guard);
            if (instance[method] && typeof instance[method] === 'function') {
                const result = await instance[method]();
                if (!result) checkResult = false;
            }
        }
        return checkResult;
    }

    const canActivate = async (): Promise<boolean> => {
        return await processGuard('canActivate');
    }

    const canDeactivate = async (): Promise<boolean> => {
        return await processGuard('canDeactivate');
    }


    /**
     * Register guards into di container
     * 
     * @param component the root component of a module or the component passed as prop:component in app-route
     * @returns void
     */
    const registerGuards = (component: FunctionComponent) => {
        if (guardRegistered) return;

        const guards = props.guards || [];
        container = new Container(component.config.dataSource);
        guards.forEach(guard => container.register(guard, {}));
        guardRegistered = true;
    }


    const evaluate = async () => {
        const match = evaluateRoutePath(props);

        if (isActive() && !match) {
            if (!(await canDeactivate())) return;

            setSelector(null);
            setIsActive(false);

            return;
        }

        const { redirectTo } = props;
        if (match && redirectTo) {
            internalService.navigate(redirectTo, {}, '', true);

            setSelector(null);
            setIsActive(false);
            return;
        }

        if (!props.component && !props.module && !redirectTo) throw new Error(`The route ${props.path} does not have a component or module property.`);

        if (!isActive() && match) {
            if (props.component && !selector()) {
                await processComponent(props);
            } else if (props.module && !selector()) {
                await processModule();
            }
        }
    }

    const processComponent = async (props: Route) => {
        if (props.component) {
            registerGuards(props.component);

            if (!(await canActivate())) return;

            setIsActive(true);

            const defined = customElements.get(getSelector(props.component));
            if (!defined) throw new Error(`The component '${getSelector(props.component)}' is not defined.`);
            fakeDefineComponent(this, props.component);

            setSelector(getSelector(props.component));
        }
    }

    const processModule = async () => {
        let module: Module;

        try {
            module = await props.module();
        } catch (error) {
            throw new Error('Module property must be a function. Ex. () => import("...").then(m => m.TestModule)');
        }

        if (!module) throw new Error(`The import statement in route ${props.path} when lazy loading a module must return the module after a promise is resolved.`);
        if (!module.root) throw new Error(`The module passed in ${props.path} route has no root component.`);

        fakeDefineComponent(this, module.root)
        bootstrap(module);

        registerGuards(module.root);

        if (!(await canActivate())) return;

        setIsActive(true);
        setSelector(getSelector(module.root));
    }

    return ifCondition(
        this,
        () => viewProps(this, renderChild(selector(), this) as any, { params: () => paramCaller }),
        () => isActive() && !!selector()
    ) as any;
}

component(route, 'app-route');
