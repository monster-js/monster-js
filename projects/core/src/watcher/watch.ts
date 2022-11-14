import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { doCreateWatcher } from "./do-create-watcher";

export const watch = (
    valueCaller: () => any,
    element: HTMLElement,
    component: ComponentInstance,
    updateCallback: (value: any) => void
) => doCreateWatcher(valueCaller, element, component.__wrapper, updateCallback, false);