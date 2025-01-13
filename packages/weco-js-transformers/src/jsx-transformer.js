const fs = require('fs');
const _path = require('path');
const sass = require('sass');

const FN_NAMES = {
  CREATE_ELEMENT: "createElement",
  CREATE_COMPONENT: "createComponent",
  CREATE_IS_COMPONENT: "createIsComponent",
  ADD_EVENT_LISTENER: "addEventListener",
  APPEND_CHILDREN: "appendChildren",
  CREATE_TEXT_NODE: "createTextNode",
  BIND_TEXT_NODE: "bindTextNode",
  BIND_ATTRIBUTES: "bindAttributes",
  IF_CONDITION: "ifCondition",
  FOR_LOOP: "forLoop",
  APPLY_PROPS: "applyProps",
  APPLY_DIRECTIVES: "applyDirectives",
  ROUTER_OUTLET: "routerOutlet"
};

function generateShortUniqueId() {
  return Math.random().toString(36).substr(2, 8); // Convert to base-36 and take 8 characters
}

let fileId;

function uniqueId() {
  return global.__GLOBAL_WECO_ELEMENT_IDS[fileId];
}

const CORE_PACKAGE_NAME = "weco-js";

let programPathGetter;

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    visitor: {
      Program(path, state) {
        programPathGetter = () => path;

        const filePath = state.file.opts.filename || '';
        const rootDir = state.file.opts.root || '';
        const filename = filePath.replace(rootDir, '');
        fileId = _path.basename(filename, _path.extname(filename));

        if (!global.__GLOBAL_WECO_ELEMENT_IDS[fileId]) {
          global.__GLOBAL_WECO_ELEMENT_IDS[fileId] = 'w' + generateShortUniqueId() + global.__GLOBAL_WECO_ELEMENT_ID_COUNTER;
          global.__GLOBAL_WECO_ELEMENT_ID_COUNTER++;
        }

      	path.node.body.forEach((node) => {
          if(
            node.type === 'ExpressionStatement'
            && node.expression.type === 'CallExpression'
            && node.expression.callee.type === 'Identifier'
            && node.expression.callee.name === 'component'
          ) {
            const componentConfig = node.expression.arguments[1];
            let isShadowDom = false;
            if (t.isObjectExpression(componentConfig)) {
              componentConfig.properties.forEach((prop) => {
              	if (
                  prop.key.type === 'Identifier'
                  && prop.key.name === 'shadowMode'
                  && prop.value.type === 'StringLiteral'
                  && (prop.value.value === 'open' || prop.value.value === 'closed')
                ) {
                  isShadowDom = true;
                }
              });
            }

            if (isShadowDom) {
              const cssFilePath = _path.join(_path.dirname(filePath), `${fileId}.scss`);

              if (fs.existsSync(cssFilePath)) {
                const scssContent = fs.readFileSync(cssFilePath, 'utf8');
                const result = sass.compileString(scssContent || '', {
                  loadPaths: ['./'],
                  url: process.cwd()
                });
                node.expression.arguments[3] = {
                  type: 'StringLiteral',
                  value: result.css
                };
              }
            }
          }
        });

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
        path.traverse({
          JSXExpressionContainer(path2) {
            // Check if the container contains only a comment (JSXEmptyExpression)
            if (path2.node.expression.type === "JSXEmptyExpression") {
                path2.remove(); // Safely remove the entire JSXExpressionContainer
            }
          },
        });
        const { node } = path;
        const tagName = node.openingElement.name.name;
        let isComponent = tagName[0] === tagName[0].toUpperCase();
        const staticAttributes = node.openingElement.attributes.filter(
          (attribute) =>
            (attribute.value &&
            attribute.value.type === "StringLiteral" &&
            attribute.name.type === "JSXIdentifier") || (attribute.value === null &&
            attribute.name.type === "JSXIdentifier")
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
        const forLoopTrackBy = node.openingElement.attributes.find(
          (attribute) =>
            attribute.name.type === "JSXNamespacedName" &&
            attribute.name.namespace.name === "v" &&
            attribute.name.name.name === "for-track-by"
        );
        const directives = node.openingElement.attributes.filter(
          (attribute) =>
            attribute.name.type === "JSXNamespacedName" &&
            attribute.name.namespace.name !== "on" &&
            attribute.name.namespace.name !== "v" &&
          	attribute.name.namespace.name !== "prop"
        );
        const children = node.children;

        // add the element unique id
        staticAttributes.push({
          type: 'JSXAttribute',
          name: { type: 'JSXIdentifier', name: uniqueId() },
          value: { type: 'StringLiteral', value: '' }
        });

        if (!isComponent) {
          staticAttributes.forEach((attr) => {
            if (attr.name.name === 'is' && attr.value.type === 'StringLiteral') {
              isComponent = true;
            }
          });
        }
        
        if (node.openingElement.name.name === "router-outlet") {
          applyRouterOutlet(path);
          return;
        } else if (node.openingElement.name.name === "element-outlet") {
          applyElementOutlet(path);
          return;
        } else if (isComponent) {
          applyCreateComponent(node);
          applyStaticAttributes(staticAttributes, node);
          applyProps(node, props);
        } else {
          applyCreateElement(node);
          applyStaticAttributes(staticAttributes, node);
        }

        applyEvents(events, node);
        applyChildren(children, node);
        applyBindAttributes(bindAttributes, node);
        applyDirectives(node, directives);
        applyIfCondition(ifCondition, node);
        applyForCondition(forLoop, forLoopItem, forLoopIndex, forLoopTrackBy, path);
      }
    }
  };
};

function applyRouterOutlet(path) {
  const component = path.node.openingElement.attributes.find((attribute) => attribute.name.name === "component");
  const routerPath = path.node.openingElement.attributes.find((attribute) => attribute.name.name === "path");
  const redirectTo = path.node.openingElement.attributes.find((attribute) => attribute.name.name === "redirect-to");
  const pathMatch = path.node.openingElement.attributes.find((attribute) => attribute.name.name === "path-match");
  const canActivate = path.node.openingElement.attributes.find((attribute) => attribute.name.name === "can-activate");
  const canDeactivate = path.node.openingElement.attributes.find((attribute) => attribute.name.name === "can-deactivate");
  const routeData = path.node.openingElement.attributes.find((attribute) => attribute.name.name === "route-data");

  addImport(FN_NAMES.ROUTER_OUTLET);
  path.node.type = 'CallExpression';
  path.node.callee = {
    type: 'Identifier',
    name: FN_NAMES.ROUTER_OUTLET
  };
  path.node.arguments = [
    { type: 'ArrowFunctionExpression', params: [], body: component ? component.value.expression : { type: 'NullLiteral' } },
    routerPath ? routerPath.value.expression || routerPath.value : { type: 'NullLiteral' },
    redirectTo ? redirectTo.value.expression || redirectTo.value : { type: 'NullLiteral' },
    pathMatch ? pathMatch.value.expression || pathMatch.value : { type: 'NullLiteral' },
    canActivate ? canActivate.value.expression || canActivate.value : { type: 'NullLiteral' },
    canDeactivate ? canDeactivate.value.expression || canDeactivate.value : { type: 'NullLiteral' },
    routeData ? routeData.value.expression || routeData.value : { type: 'NullLiteral' },
  ];
}

function applyElementOutlet(path) {
  const element = path.node.openingElement.attributes.find((attribute) => attribute.name.name === "element");
  Object.keys(element.value.expression).forEach((key) => {
    const except = ["end", "innerComments", "leadingComments", "loc", "start", "trailingComments"];
    if (except.includes(key)) return;
    path.node[key] = element.value.expression[key];
  });
}

function applyDirectives(node, directives) {
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
  const tagName = node.openingElement.name.name;
  if (tagName[0] === tagName[0].toUpperCase()) {
    addImport(FN_NAMES.CREATE_COMPONENT);
    node.type = "CallExpression";
    node.callee = {
      type: "Identifier",
      name: FN_NAMES.CREATE_COMPONENT
    };
    node.arguments = [
      { type:"Identifier", name: tagName }
    ];
  } else {
    addImport(FN_NAMES.CREATE_IS_COMPONENT);
    node.type = "CallExpression";
    node.callee = {
      type: "Identifier",
      name: FN_NAMES.CREATE_IS_COMPONENT
    };
    node.arguments = [
      { type:"StringLiteral", value: tagName }
    ];
  }
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

function applyForCondition(forLoop, forLoopItem, forLoopIndex, forLoopTrackBy, path) {
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
    
    if (forLoopTrackBy) {
      node.arguments.push(forLoopTrackBy.value.expression || forLoopTrackBy.value);
    }

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
    node.arguments.push(jsxAttributesToObject(staticAttributes.map(attribute => {
    	if (attribute.value) return attribute;
      return {
      	...attribute,
        value: { type: 'StringLiteral', value: '' }
      }
    })));
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
