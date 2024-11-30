const FN_NAMES = {
  CREATE_ELEMENT: "createElement",
  CREATE_COMPONENT: "createComponent",
  ADD_EVENT_LISTENER: "addEventListener",
  APPEND_CHILDREN: "appendChildren",
  CREATE_TEXT_NODE: "createTextNode",
  BIND_TEXT_NODE: "bindTextNode",
  BIND_ATTRIBUTES: "bindAttributes",
  IF_CONDITION: "ifCondition",
  FOR_LOOP: "forLoop",
  APPLY_PROPS: "applyProps",
  APPLY_DIRECTIVES: "applyDirectives"
};

const CORE_PACKAGE_NAME = "weco-js";

let programPathGetter;

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    visitor: {
      Program(path) {
        programPathGetter = () => path;
      },
      JSXText(path) {
        const { node } = path;
        addImport(FN_NAMES.CREATE_TEXT_NODE);
        node.type = "CallExpression";
        node.callee = {
          type: "Identifier",
          name: FN_NAMES.CREATE_TEXT_NODE
        };
        node.arguments = [
          {
            type: "StringLiteral",
            value: node.value
          }
        ];
      },
      JSXElement(path) {
        const { node } = path;
        const tagName = node.openingElement.name.name;
        const isComponent = tagName[0] === tagName[0].toUpperCase();
        const staticAttributes = node.openingElement.attributes.filter(
          (attribute) =>
            attribute.value &&
            attribute.value.type === "StringLiteral" &&
            attribute.name.type === "JSXIdentifier"
        );
        const bindAttributes = node.openingElement.attributes.filter(
          (attribute) =>
            attribute.value &&
            attribute.value.type === "JSXExpressionContainer" &&
            attribute.name.type === "JSXIdentifier"
        );
        const props = node.openingElement.attributes.filter(
          (attribute) =>
            attribute.name.type === "JSXNamespacedName" && attribute.name.namespace.name === "prop"
        );
        const events = node.openingElement.attributes.filter(
          (attribute) =>
            attribute.name.type === "JSXNamespacedName" && attribute.name.namespace.name === "on"
        );
        const ifCondition = node.openingElement.attributes.find(
          (attribute) =>
            attribute.name.type === "JSXNamespacedName" &&
            attribute.name.namespace.name === "v" &&
            attribute.name.name.name === "if"
        );
        const forLoop = node.openingElement.attributes.find(
          (attribute) =>
            attribute.name.type === "JSXNamespacedName" &&
            attribute.name.namespace.name === "v" &&
            attribute.name.name.name === "for"
        );
        const forLoopItem = node.openingElement.attributes.find(
          (attribute) =>
            attribute.name.type === "JSXNamespacedName" &&
            attribute.name.namespace.name === "v" &&
            attribute.name.name.name === "for-item"
        );
        const forLoopIndex = node.openingElement.attributes.find(
          (attribute) =>
            attribute.name.type === "JSXNamespacedName" &&
            attribute.name.namespace.name === "v" &&
            attribute.name.name.name === "for-index"
        );
        const directives = node.openingElement.attributes.filter(
          (attribute) =>
            attribute.name.type === "JSXNamespacedName" &&
            attribute.name.namespace.name !== "on" &&
            attribute.name.namespace.name !== "v"
        );
        const children = node.children;

        if (node.openingElement.name.name === "element-outlet") {
          applyElementOutlet(path);
          return;
        } else if (isComponent) {
          applyCreateComponent(node);
          applyProps(node, props);
        } else {
          applyCreateElement(node);
        }

        applyStaticAttributes(staticAttributes, node);
        applyEvents(events, node);
        applyChildren(children, node);
        applyBindAttributes(bindAttributes, node);
        applyDirectives(node, directives);
        applyIfCondition(ifCondition, node);
        applyForCondition(forLoop, forLoopItem, forLoopIndex, path);
      }
    }
  };
};

function applyElementOutlet(path) {
  const element = path.node.openingElement.attributes.find((attribute) => attribute.name.name === "element");
  console.log(element);
  Object.keys(element.value.expression).forEach((key) => {
    const except = ["end", "innerComments", "leadingComments", "loc", "start", "trailingComments"];
    if (except.includes(key)) return;
    path.node[key] = element.value.expression[key];
  });
}

function applyDirectives(node, directives) {
  console.log(directives);
  if (directives.length > 0) {
    addImport(FN_NAMES.APPLY_DIRECTIVES);
    const originalNode = { ...node };
    node.type = "CallExpression";
    node.callee = {
      type: "Identifier",
      name: FN_NAMES.APPLY_DIRECTIVES
    };
    node.arguments = [
      {
        type: "ThisExpression"
      },
      originalNode,
      {
        type: "ArrayExpression",
        elements: directives.map((directive) => {
          const elements = [];
          elements.push({
            type: "StringLiteral",
            value: directive.name.namespace.name
          });
          elements.push({
            type: "StringLiteral",
            value: directive.name.name.name
          });
          if (directive.value) {
            if (directive.value.type === "StringLiteral") {
              elements.push({
                type: "ArrowFunctionExpression",
                params: [],
                body: directive.value
              });
            } else {
              elements.push({
                type: "ArrowFunctionExpression",
                params: [],
                body: directive.value.expression
              });
            }
          }
          return {
            type: "ArrayExpression",
            elements
          };
        })
      }
    ];
  }
}

function applyProps(node, props) {
  if (props.length === 0) return;
  addImport(FN_NAMES.APPLY_PROPS);
  const originalNode = { ...node };
  node.type = "CallExpression";
  node.callee = {
    type: "Identifier",
    name: FN_NAMES.APPLY_PROPS
  };
  node.arguments = [
    {
      type: "ThisExpression"
    },
    originalNode,
    {
      type: "ObjectExpression",
      properties: props.map((prop) => {
        return {
          type: "ObjectProperty",
          key:
            prop.name.name.name.indexOf("-") > -1
              ? {
                  type: "StringLiteral",
                  value: prop.name.name.name
                }
              : {
                  type: "Identifier",
                  name: prop.name.name.name
                },
          value: {
            type: "ArrowFunctionExpression",
            params: [],
            body: prop.value.expression ? prop.value.expression : prop.value
          }
        };
      })
    }
  ];
}

function applyCreateComponent(node) {
  addImport(FN_NAMES.CREATE_COMPONENT);
  node.type = "CallExpression";
  node.callee = {
    type: "Identifier",
    name: FN_NAMES.CREATE_COMPONENT
  };
  node.arguments = [
    {
      type: "Identifier",
      name: node.openingElement.name.name
    }
  ];
}

function applyCreateElement(node) {
  addImport(FN_NAMES.CREATE_ELEMENT);
  node.type = "CallExpression";
  node.callee = {
    type: "Identifier",
    name: FN_NAMES.CREATE_ELEMENT
  };
  node.arguments = [
    {
      type: "StringLiteral",
      value: node.openingElement.name.name
    }
  ];
}

function applyForCondition(forLoop, forLoopItem, forLoopIndex, path) {
  if (forLoop) {
    addImport(FN_NAMES.FOR_LOOP);
    const { node } = path;
    const originalNode = { ...node };
    let forLoopItemValue = "$item";
    let forLoopIndexValue = "$index";

    if (forLoopItem) {
      forLoopItemValue = forLoopItem.value.value;
    }
    if (forLoopIndex) {
      forLoopIndexValue = forLoopIndex.value.value;
    }

    node.type = "CallExpression";
    node.callee = {
      type: "Identifier",
      name: FN_NAMES.FOR_LOOP
    };
    node.arguments = [
      {
        type: "ThisExpression"
      },
      {
        type: "ArrowFunctionExpression",
        params: [
          {
            type: "Identifier",
            name: forLoopIndexValue
          }
        ],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "VariableDeclaration",
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: {
                    type: "Identifier",
                    name: forLoopItemValue
                  },
                  init: {
                    type: "StringLiteral",
                    value: ""
                  }
                }
              ]
            },
            {
              type: "ReturnStatement",
              argument: originalNode
            }
          ]
        }
      },
      {
        type: "ArrowFunctionExpression",
        params: [],
        body: forLoop.value.expression
      }
    ];

    path.traverse({
      VariableDeclaration(path2) {
        if (path2.scope.bindings[forLoopItemValue]) {
          path2.scope.bindings[forLoopItemValue].referencePaths.forEach((item) => {
            item.node.type = "MemberExpression";
            item.node.object = forLoop.value.expression;
            item.node.computed = true;
            item.node.property = {
              type: "Identifier",
              name: forLoopIndexValue
            };
          });
          path2.remove();
        }
      }
    });
  }
}

function applyStaticAttributes(staticAttributes, node) {
  if (staticAttributes.length > 0) {
    node.arguments.push(jsxAttributesToObject(staticAttributes));
  }
}

function applyEvents(events, node) {
  if (events.length > 0) {
    addImport(FN_NAMES.ADD_EVENT_LISTENER);
    const originalNode = { ...node };
    node.type = "CallExpression";
    node.callee = {
      type: "Identifier",
      name: FN_NAMES.ADD_EVENT_LISTENER
    };
    node.arguments = [
      originalNode,
      {
        type: "ObjectExpression",
        properties: events.map((event) => {
          return {
            type: "ObjectProperty",
            key: {
              type: "Identifier",
              name: event.name.name.name
            },
            value: {
              type: "ArrowFunctionExpression",
              params: [
                {
                  type: "Identifier",
                  name: "$event"
                },
                {
                  type: "Identifier",
                  name: "$element"
                }
              ],
              body: event.value.expression
            }
          };
        })
      }
    ];
  }
}

function applyChildren(children, node) {
  if (children.length > 0) {
    addImport(FN_NAMES.APPEND_CHILDREN);
    const originalNode = { ...node };
    node.type = "CallExpression";
    node.callee = {
      type: "Identifier",
      name: FN_NAMES.APPEND_CHILDREN
    };
    node.arguments = [
      originalNode,
      {
        type: "ArrayExpression",
        elements: children.map((child) => {
          if (child.type === "JSXExpressionContainer") {
            addImport(FN_NAMES.CREATE_TEXT_NODE);
            addImport(FN_NAMES.BIND_TEXT_NODE);
            return {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: FN_NAMES.BIND_TEXT_NODE
              },
              arguments: [
                {
                  type: "ThisExpression"
                },
                {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: FN_NAMES.CREATE_TEXT_NODE
                  },
                  arguments: [
                    {
                      type: "StringLiteral",
                      value: ""
                    }
                  ]
                },
                {
                  type: "ArrowFunctionExpression",
                  params: [],
                  body: child.expression
                }
              ]
            };
          }
          return child;
        })
      }
    ];
  }
}

function applyBindAttributes(bindAttributes, node) {
  if (bindAttributes.length > 0) {
    addImport(FN_NAMES.BIND_ATTRIBUTES);
    const originalNode = { ...node };
    node.type = "CallExpression";
    node.callee = {
      type: "Identifier",
      name: FN_NAMES.BIND_ATTRIBUTES
    };
    node.arguments = [
      {
        type: "ThisExpression"
      },
      originalNode,
      {
        type: "ObjectExpression",
        properties: bindAttributes.map((attribute) => {
          return {
            type: "ObjectProperty",
            key: {
              type: "Identifier",
              name: attribute.name.name
            },
            value: {
              type: "ArrowFunctionExpression",
              params: [],
              body: attribute.value.expression
            }
          };
        })
      }
    ];
  }
}

function applyIfCondition(ifCondition, node) {
  if (ifCondition) {
    addImport(FN_NAMES.IF_CONDITION);
    const originalNode = { ...node };
    node.type = "CallExpression";
    node.callee = {
      type: "Identifier",
      name: FN_NAMES.IF_CONDITION
    };
    node.arguments = [
      {
        type: "ThisExpression"
      },
      {
        type: "ArrowFunctionExpression",
        params: [],
        body: originalNode
      },
      {
        type: "ArrowFunctionExpression",
        params: [],
        body: ifCondition.value.expression
      }
    ];
  }
}

function jsxAttributesToObject(attributes) {
  return {
    type: "ObjectExpression",
    properties: attributes.map((attribute) => {
      return {
        type: "ObjectProperty",
        key: {
          type: "Identifier",
          name: attribute.name.name
        },
        value: {
          type: attribute.value.type,
          value: attribute.value.value
        }
      };
    })
  };
}

function addImport(name) {
  let coreImports = [];
  programPathGetter().node.body.forEach((item) => {
    if (item.type === "ImportDeclaration" && item.source.value === CORE_PACKAGE_NAME) {
      coreImports.push(item);
    }
  });

  let hasImport = false;
  coreImports.forEach((item) => {
    item.specifiers.forEach((item2) => {
      if (item2.imported.name === name) {
        hasImport = true;
      }
    });
  });

  if (!hasImport && coreImports.length > 0) {
    coreImports[0].specifiers.push({
      type: "ImportSpecifier",
      imported: {
        type: "Identifier",
        name: name
      }
    });
  }
  if (!hasImport && coreImports.length === 0) {
    programPathGetter().node.body = [
      {
        type: "ImportDeclaration",
        source: {
          type: "StringLiteral",
          value: CORE_PACKAGE_NAME
        },
        specifiers: [
          {
            type: "ImportSpecifier",
            imported: {
              type: "Identifier",
              name: name
            }
          }
        ]
      },
      ...programPathGetter().node.body
    ];
  }
}
