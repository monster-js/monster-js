declare const fs: any;
declare const _path: any;
declare const sass: any;
declare const FN_NAMES: {
    CREATE_ELEMENT: string;
    CREATE_COMPONENT: string;
    CREATE_IS_COMPONENT: string;
    ADD_EVENT_LISTENER: string;
    APPEND_CHILDREN: string;
    CREATE_TEXT_NODE: string;
    BIND_TEXT_NODE: string;
    BIND_MODEL: string;
    BIND_ATTRIBUTES: string;
    IF_CONDITION: string;
    FOR_LOOP: string;
    APPLY_PROPS: string;
    APPLY_DIRECTIVES: string;
    ROUTER_OUTLET: string;
    CREATE_FRAGMENT: string;
};
declare const THIS_EXPRESSION = "\u03B8t";
declare function kebabToCamelCase(str: string): string;
declare function generateShortUniqueId(): string;
declare let fileId: string | number;
declare function uniqueId(): any;
declare const CORE_PACKAGE_NAME = "monster-js";
declare let programPathGetter: () => any;
declare function applyRouterOutlet(path: {
    node: {
        openingElement: {
            attributes: any[];
        };
        type: string;
        callee: {
            type: string;
            name: string;
        };
        arguments: any[];
    };
}): void;
declare function applyElementOutlet(path: {
    node: {
        [x: string]: any;
        openingElement: {
            attributes: any[];
        };
    };
}): void;
declare function applyDirectives(node: {
    type: string;
    callee: {
        type: string;
        name: string;
    };
    arguments: any[];
}, directives: any[]): void;
declare function applyProps(node: {
    type: string;
    callee: {
        type: string;
        name: string;
    };
    arguments: any[];
}, props: any[]): void;
declare function applyCreateComponent(node: {
    openingElement: {
        name: {
            name: any;
        };
    };
    type: string;
    callee: {
        type: string;
        name: string;
    };
    arguments: {
        type: string;
        name: any;
    }[] | {
        type: string;
        value: any;
    }[];
}): void;
declare function applyFragment(node: any): void;
declare function applyCreateElement(node: {
    type: string;
    callee: {
        type: string;
        name: string;
    };
    arguments: {
        type: string;
        value: any;
    }[];
    openingElement: {
        name: {
            name: any;
        };
    };
}): void;
declare function applyForCondition(forLoop: {
    value: {
        expression: any;
    };
}, forLoopItem: {
    value: {
        value: string;
    };
}, forLoopIndex: {
    value: {
        value: string;
    };
}, forLoopTrackBy: {
    value: {
        expression: any;
    };
}, path: {
    traverse?: any;
    node?: any;
}): void;
declare function applyStaticAttributes(staticAttributes: any[], node: {
    arguments: {
        type: string;
        properties: any;
    }[];
}): void;
declare function applyEvents(events: any[], node: {
    type: string;
    callee: {
        type: string;
        name: string;
    };
    arguments: any[];
}): void;
declare function applyChildren(children: any[], node: {
    type: string;
    callee: {
        type: string;
        name: string;
    };
    arguments: any[];
}): void;
declare function applyViewModel(node: {
    type: string;
    callee: {
        type: string;
        name: string;
    };
    arguments: any[];
}, viewModel: {
    value: {
        expression: any;
    };
}): void;
declare function applyBindAttributes(bindAttributes: any[], node: {
    type: string;
    callee: {
        type: string;
        name: string;
    };
    arguments: any[];
}): void;
declare function applyIfCondition(ifCondition: {
    value: {
        expression: any;
    };
}, node: {
    type: string;
    callee: {
        type: string;
        name: string;
    };
    arguments: ({
        type: string;
        name?: string;
        params?: undefined;
        body?: undefined;
    } | {
        type: string;
        params: never[];
        body: any;
    })[];
}): void;
declare function jsxAttributesToObject(attributes: any[]): {
    type: string;
    properties: {
        type: string;
        key: {
            type: string;
            name: any;
        };
        value: {
            type: any;
            value: any;
        };
    }[];
};
declare function addImport(name: string): void;
