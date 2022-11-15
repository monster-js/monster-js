import { AllDirectivesArg } from "./interfaces/all-directive-arg.interface";
import { DirectiveArg } from "./interfaces/directive-arg.interface";
import { watchDirective } from "./utils/watch-directive";

export const ViewModelDirective = (args: AllDirectivesArg) => {
    const { model } = args.directives;

    if (model) {
        const processInputAndSelect = (param: DirectiveArg, eventType: string) => {
            const getter = param.directive.get();
            const valueCaller = getter[0];
            const valueSetter = getter[1];
            param.element.addEventListener(eventType, (event: any) => valueSetter(event.target.value));
            watchDirective({
                ...param,
                directive: {
                    get: valueCaller,
                    set: valueSetter
                }
            }, newValue => (param.element as any).value = newValue);
            (param.element as any).value = valueCaller();
        }
        const setRadioChecked = (element: Element, newValue: any) => element.getAttribute('value') === newValue
            ? element.setAttribute('checked', '')
            : element.removeAttribute('checked');
        const radioModel = (param: DirectiveArg) => {
            const getter = param.directive.get();
            const valueCaller = getter[0];
            const valueSetter = getter[1];

            if (!param.element.getAttribute('value')) throw new Error(`Radio buttons must have a value attribute to bind a model to it.`);

            param.element.addEventListener('change', (event: any) => valueSetter(event.target.value));

            watchDirective({
                ...param,
                directive: {
                    get: valueCaller,
                    set: valueSetter
                }
            }, newValue => setRadioChecked(param.element, newValue));
            setRadioChecked(param.element, valueCaller());
        }

        const setCheckboxChecked = (element: Element, value: any) => !!value
            ? element.setAttribute('checked', '')
            : element.removeAttribute('checked');

        const checkboxModel = (directive: DirectiveArg['directive']) => {
            const getter = directive.get();
            const valueCaller = getter[0];
            const valueSetter = getter[1];
            args.element.addEventListener('change', (event: any) => valueSetter(event.target.checked));

            watchDirective({
                component: args.component,
                directive: {
                    get: valueCaller,
                    set: valueSetter
                },
                element: args.element
            }, newValue => setCheckboxChecked(args.element, newValue));

            setCheckboxChecked(args.element, valueCaller());
        }

        const inputModel = (param: DirectiveArg['directive']) => {
            const type = args.element.getAttribute('type');
            if (type && type === 'checkbox') {
                return checkboxModel(param);
            } else if (type && type === 'radio') {
                return radioModel({
                    component: args.component,
                    directive: param,
                    element: args.element
                });
            }
            processInputAndSelect({
                component: args.component,
                directive: param,
                element: args.element
            }, 'input');
        }

        const selectModel = (param: DirectiveArg) => processInputAndSelect(param, 'change');

        switch(args.element.localName) {
            case 'input':
            case 'textarea':
                inputModel(model);
                break;
            case 'select':
                selectModel({
                    component: args.component,
                    directive: model,
                    element: args.element
                });
                break;
        }
    }
}

ViewModelDirective.namespace = 'v';
