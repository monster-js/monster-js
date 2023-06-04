import { Watcher } from "../../watcher/interfaces/watcher.interface";
import { ViewDirective } from '../../view-engine/interfaces/view-directive.interface';
import { Hook } from "../../hook/interfaces/hook.interface";
import { Hooks } from "../../hook/enums/hooks.enum";
import { FunctionComponent } from "./function-component.interface";
import { ObservedAttributeWatcher } from "../../attributes/interfaces/observed-attribute-watcher.interface";

export interface Component extends HTMLElement {
    watchers: Watcher[];
    cWatchers: Watcher[];
    setProps: (props: { [key: string]: any; }) => void;
    detectChanges: () => void;
    directives: { [key: string]: (element: HTMLElement,  directive?: ViewDirective['d'], context?: FunctionComponent) => HTMLElement; };
    hooks: { [k in Hooks]: Hook[] };
    observedAttrWatchers: ObservedAttributeWatcher;
}