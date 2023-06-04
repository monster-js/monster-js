import { FunctionComponent } from "../../public_apis";
import { createWatcher } from "../watcher/create-watcher";
import { createDirective } from "./create-directive";
import { DirectiveObject } from "./interfaces/directive-object.interface";

export const viewDirectives = (element: HTMLElement, directives: DirectiveObject, context: FunctionComponent) => {
    const { ref, model, class: cls } = directives;

    if (ref) ref.set(element);

    if (model) {
        const processInputAndSelect = (eventType: string) => {
            const getter = model.get();
            const valueCaller = getter[0];
            const valueSetter = getter[1];
            element.addEventListener(eventType, (event: any) => valueSetter(event.target.value));
            createWatcher(valueCaller, element, context, newValue => (element as any).value = newValue);
            (element as any).value = valueCaller();
        };
        const setRadioChecked = (newValue: any) => element.getAttribute('value') === newValue
            ? element.setAttribute('checked', '')
            : element.removeAttribute('checked');
        const radioModel = () => {
            const getter = model.get();
            const valueCaller = getter[0];
            const valueSetter = getter[0];

            if (!element.getAttribute('value')) throw new Error(`Radio buttons must have a value attribute to bind a model to it.`);

            element.addEventListener('change', (event: any) => valueSetter(event.target.value));

            createWatcher(valueCaller, element, context, newValue => setRadioChecked(newValue));
            setRadioChecked(valueCaller());
        }

        const setCheckboxChecked = (element: Element, value: any) => !!value
            ? element.setAttribute('checked', '')
            : element.removeAttribute('checked');

        const checkboxModel = () => {
            const getter = model.get();
            const valueCaller = getter[0];
            const valueSetter = getter[1];
            element.addEventListener('change', (event: any) => valueSetter(event.target.checked));
            createWatcher(valueCaller, element, context, newValue => setCheckboxChecked(element, newValue));
            setCheckboxChecked(element, valueCaller());
        }

        const inputModel = () => {
            const type = element.getAttribute('type');
            if (type && type === 'checkbox') {
                return checkboxModel();
            } else if (type && type === 'radio') {
                return radioModel();
            }
            processInputAndSelect('input');
        }

        const selectModel = () => processInputAndSelect('change');

        switch(element.localName) {
            case 'input':
            case 'textarea':
                inputModel();
                break;
            case 'select':
                selectModel();
                break;
        }
    }

    if (cls) {
        const updateClassList = (value: { [key: string]: any }) => Object.keys(value).forEach(key => !!value[key]
            ? element.classList.add(key)
            : element.classList.remove(key));

        const valueCaller = cls.get;

        createWatcher(
            () => {
                const newVal = valueCaller();
                return Object.keys(newVal).map(key => !!newVal[key]).join();
            },
            element,
            context,
            () => updateClassList(valueCaller())
        );

        updateClassList(valueCaller());
    }

    return element;
}

createDirective(viewDirectives, 'v');
