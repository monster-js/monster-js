import { DataSource } from "../../dependency-injection/interfaces/data-source.interface";
import { Directive } from "../../directive/types/directive.type";
import { Hooks } from "../../hook/enums/hooks.enum";
import { Hook } from "../../hook/interfaces/hook.interface";
import { ObservedAttributeWatcher } from "../../observed-attributes/interfaces/observed-attribute-watcher.interface";
import { Pipe } from "../../pipe/types/pipe.type";
import { ChangeDetectionStrategy } from "../../state/enums/change-detection-strategy.enum";
import { Watcher } from "../../watcher/interfaces/watcher.interface";
import { DefinedComponents } from "./defined-components.interface";

export interface ComponentWrapper extends HTMLElement {
    selector: string;
    watchers: Watcher[];
    conditionWatchers: Watcher[];
    definedComponents: DefinedComponents;
    fakeDefinedComponents: DefinedComponents;
    dataSource: DataSource;
    element: HTMLElement;
    changeDetectionStrategy: ChangeDetectionStrategy;
    componentShadowRoot: ShadowRoot;
    isShadowDom: boolean;
    useStyle(style: any, key?: any): void;

    props: { [key: string]: any; };
    setProps(props: { [key: string]: any; }): void;

    directives: { [key: string]: Directive[]; };
    pipes: { [key: string]: Pipe; };

    observedAttrWatchers: ObservedAttributeWatcher;
    hooks: { [k in Hooks]: Hook[] };

    detectChanges(): void;
}
