import { FunctionComponent } from "../component/interfaces/function-component.interface";
import { defineComponent } from "../component/define-component";
import { ExtendedModule } from "./interfaces/extended-module.interface";
import { pipes } from '../pipe/pipes';
import { providers } from '../dependency-injection/providers';
import { directives } from '../directive/directives';

function defineModuleComponent(component: FunctionComponent, module: ExtendedModule) {
    const selector = component.config.selector;
    const componentObj: { [key: string]: any; } = module.definedComponents.components;
    componentObj[selector] = 1;
    component.config.dataSource.data = module.dataSource.data;
    component.config.definedComponents.components = module.definedComponents.components;

    const exportedPipes = module.childrenExports.pipes;
    pipes(component, ...(exportedPipes || []), ...(module.pipes || []));

    const exportedProviders = module.childrenExports.providers;
    providers(component, ...(exportedProviders || []), ...(module.providers || []));

    const exportedDirectives = module.childrenExports.directives;
    directives(component, ...(exportedDirectives || []), ...(module.directives || []));

    defineComponent(component);
}

function defineComponents(module: ExtendedModule): void {
    const components = module.components || [];
    const root = module.root;
    const exportedComponents = module.exports.components || [];
    const combinedComponents = [...new Set([...exportedComponents, ...components])];

    combinedComponents.forEach(component => defineModuleComponent(component, module));
    if (root) defineModuleComponent(root, module);
}

function setupChildModules(module: ExtendedModule) {
    (module.modules || []).forEach(item => {
        const mod = bootstrap(item);
        const setExports = (key: string) => module.childrenExports[key].push(...(mod.exports[key] || []));
        setExports('directives');
        setExports('services');
        setExports('components');
        setExports('pipes');
    });

    module.childrenExports.components.forEach(item => module.definedComponents.components[item.config.selector] = true);
}

export const bootstrap = (module: ExtendedModule): ExtendedModule => {
    if (module.defined) return module;
    module.defined = 1;



    module.exports = module.exports || {};
    module.definedComponents = { components: {} };
    module.dataSource = { data: new Map(), name: null };
    module.childrenExports = {
        directives: [],
        providers: [],
        components: [],
        pipes: []
    };

    setupChildModules(module);
    defineComponents(module);

    return module;
}
