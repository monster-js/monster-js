import { watch } from "../watcher/watch";
import { AllDirectivesArg } from "./interfaces/all-directive-arg.interface";

export const viewDirectives = (args: AllDirectivesArg) => {
    const { ref, class: cls } = args.directives;

    if (ref) ref.set(args.element);

    if (cls) {
        const updateClassList = (value: { [key: string]: any }, element: HTMLElement) => Object.keys(value).forEach(key => !!value[key]
            ? element.classList.add(key)
            : element.classList.remove(key));

        const valueCaller = cls.get;

        watch(
            () => {
                const newVal = valueCaller();
                return Object.keys(newVal).map(key => newVal[key]).join();
            },
            args.element,
            args.component,
            () => updateClassList(valueCaller(), args.element)
        );

        updateClassList(valueCaller(), args.element);
    }

}

viewDirectives.namespace = 'v';
