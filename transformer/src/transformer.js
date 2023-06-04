const { generateElementKey } = require("./utils/generate-element-key");

const CORE_PACKAGE = '@monster-js/core';



const ADD_EVENT_LISTENER = 'θa';
const APPEND_CHILDREN = 'θb';
const CREATE_ELEMENT = 'θc';
const CREATE_TEXT_NODE = 'θd';
const RENDER_CHILD_COMPONENT = 'θe';
const TEXT_BINDING = 'θf';
const SET_ATTRIBUTES = 'θg';
const ATTRIBUTE_BINDING = 'θh';
const VIEW_PROPS = 'θi';
const VIEW_DIRECTIVE = 'θj';
const IF_CONDITION = 'θk';
const LIST_RENDERING = 'θl';




const CONTEXT = {
  type: 'ThisExpression'
};

let programPathGetter;
let listRenderingIndexCount = 0;
let listRenderingItemCount = 0;
let elementKey = '';

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    visitor: {
      Program(path) {
        listRenderingIndexCount = 0;
        listRenderingItemCount = 0;
        programPathGetter = () => path;
        elementKey = generateElementKey(path.hub.file.opts.filename);
      },
      JSXElement(path) {

        path.traverse({
          // remove comments
          JSXEmptyExpression(path2) {
            path2.parentPath.remove();
          },
        });

        const { node } = path;
        const name = node.openingElement.name.name;
        const events = node.openingElement.attributes.filter(item => (
          item.name.type === 'JSXNamespacedName'
          && (item.name.namespace.name === 'on' || item.name.namespace.name === 'on-prevent')
        ));
        let attributes = node.openingElement.attributes.filter(item => (
          item.name.type === 'JSXIdentifier'
          && ((!!item.value && item.value.type === 'StringLiteral') || !item.value)
        ));
        const attributeBindings = node.openingElement.attributes.filter(item => (
          item.name.type === 'JSXIdentifier'
          && (!!item.value && item.value.type === 'JSXExpressionContainer')
        ));
        const directives = node.openingElement.attributes.filter(item => {
          if (
            item.name.type === 'JSXNamespacedName'
            && item.name.namespace.name !== 'on'
            && item.name.namespace.name !== 'on-prevent'
            && item.name.namespace.name !== 'v'
            && item.name.namespace.name !== 'attr'
          ) {
            return true;
          }
          if (
            item.name.type === 'JSXNamespacedName'
            && item.name.namespace.name === 'v'
            && (
              item.name.name.name === 'ref'
              || item.name.name.name === 'model'
              || item.name.name.name === 'class'
            )
          ) {
            return true;
          }
          return false;
        });
        const observedAttributes = node.openingElement.attributes.filter(item => (
          item.name.type === 'JSXNamespacedName'
          && item.name.namespace.name === 'attr'
        ));

        let isAttribute;
        attributes = attributes.filter(item => {
          if (item.name.name === 'is') {
            isAttribute = item;
            return false;
          }
          return true;
        });

        let ifCondition
        const listRendering = [];
        node.openingElement.attributes.forEach(item => {
          if (
            item.name.type === 'JSXNamespacedName'
            && item.name.namespace.name === 'v'
            && item.name.name.name === 'if'
          ) {
            ifCondition = item;
          }
          if (
            item.name.type === 'JSXNamespacedName'
            && item.name.namespace.name === 'v'
            && (item.name.name.name === 'for' || item.name.name.name === 'for-item' || item.name.name.name === 'for-index' || item.name.name.name === 'for-update')
          ) {
            listRendering[kebabToCamel(item.name.name.name)] = item;
          }
        });
        const isComponent = name.charAt(0) === name.charAt(0).toUpperCase();
        
        if (isComponent) {
          addImport(RENDER_CHILD_COMPONENT);
          node.type = 'CallExpression';
          node.callee = { type: 'Identifier', name: RENDER_CHILD_COMPONENT };
          node.arguments = [
            { type: 'StringLiteral', value: `app-${camelToKebab(name)}` },
            { type: 'Identifier', name: name },
            { type: 'StringLiteral', value: elementKey }
          ];
        } else {
          addImport(CREATE_ELEMENT);
          node.type = 'CallExpression';
          node.callee = { type: 'Identifier', name: CREATE_ELEMENT };
          node.arguments = [
            { type: 'StringLiteral', value: node.openingElement.name.name },
            { type: 'StringLiteral', value: elementKey }
          ];
          if (isAttribute) {
            const originalName = { ...node.arguments[0] };
            node.arguments[0] = {
              type: 'StringLiteral',
              value: isAttribute.value.value
            };
            node.arguments.push(originalName);
          }
        }
        
        if (isComponent) {
            // attributes of component are treated as props
          const allAttributes = [...attributes, ...attributeBindings];
          if (allAttributes.length > 0) {
            handleProps(node, allAttributes);
          }
          if (observedAttributes.length > 0) {
            handleObservedAttributes(node, observedAttributes);
          }
        } else {
          // if there are attributes
          if (attributes.length > 0) {
            handleAttributes(node, attributes);
          }
          // if there are attribute bindings
          if (attributeBindings.length > 0) {
            handleAttributeBindings(node, attributeBindings);
          }
        }
        
        // if there are children
        if (node.children.length > 0) {
          handleChildren(node);
        }
        
        // if there are event directives
        if (events.length > 0) {
          handleEvents(node, events);
        }
        
        // if there are directives
        if (directives.length > 0) {
          transformDirective(node, directives);
        }

        if (ifCondition) {
          handleIfCondition(node, ifCondition);
        }

        transformListRendering(path, listRendering);

      },
    },
  };
};


function transformListRendering(path, listRendering) {
  const { node } = path;
  if (listRendering.for) {
    addImport(LIST_RENDERING);

    const originalNode = { ...node };
    const forItemValue = listRendering.forItem ? listRendering.forItem.value.value : getListItem();
    const forIndexValue = listRendering.forIndex ? listRendering.forIndex.value.value : getListIndex();

    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: LIST_RENDERING
    };
    node.arguments = [
      CONTEXT,
      {
        type: 'ArrowFunctionExpression',
        params: [
          {
            type: 'Identifier',
            name: forIndexValue
          }
        ],
        body: {
          type: 'BlockStatement',
          body: [
            {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: forItemValue
                  },
                  init: {
                    type: 'StringLiteral',
                    value: ''
                  }
                }
              ]
            },
            {
              type: 'ReturnStatement',
              argument: originalNode
            }
          ]
        }
      },
      {
        type: 'ArrowFunctionExpression',
        params: [],
        body: listRendering.for.value.expression
      }
    ];
    
    if (listRendering.forUpdate) {
      node.arguments.push(listRendering.forUpdate.value.expression);
    }

    path.traverse({
      VariableDeclaration(path2) {
        if (path2.scope.bindings[forItemValue]) {
          path2.scope.bindings[forItemValue].referencePaths.forEach(item => {
            item.node.type = 'MemberExpression';
            item.node.object = listRendering.for.value.expression;
            item.node.computed = true;
            item.node.property = {
              type: 'Identifier',
              name: forIndexValue
            }
          });
          path2.remove();
        }
      }
    });

  }
}

function handleIfCondition(node, ifCondition) {
  if (ifCondition) {
    addImport(IF_CONDITION);

    const originalNode = { ...node };

    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: IF_CONDITION
    };
    node.arguments = [
      CONTEXT,
      {
        type: 'ArrowFunctionExpression',
        params: [],
        body: originalNode
      },
      {
        type: 'ArrowFunctionExpression',
        params: [],
        body: ifCondition.value.expression
      }
    ];

  }
}

function handleProps(node, attributes) {
  addImport(VIEW_PROPS);
  const originalNode = { ...node };
  node.type = 'CallExpression';
  node.callee = { type: 'Identifier', name: VIEW_PROPS };
  node.arguments = [
    CONTEXT,
    originalNode,
    {
      type: 'ObjectExpression',
      properties: attributes.map(item => ({
        type: 'ObjectProperty',
        key: formatObjectKey(item.name.name),
        value: {
          type: 'ArrowFunctionExpression',
          params: [],
          body: !item.value ? { type: 'StringLiteral', value: '' } : (
            item.value.type === 'JSXExpressionContainer'
              ? item.value.expression
              : item.value
          )
        }
      }))
    }
  ];
}

function transformAttributeBinding(node, properties) {
  addImport(ATTRIBUTE_BINDING);
  const originalNode = { ...node };
  node.type = 'CallExpression';
  node.callee = {
    type: 'Identifier',
    name: ATTRIBUTE_BINDING
  };
  node.arguments = [
    CONTEXT,
    originalNode,
    {
      type: 'ObjectExpression',
      properties
    }
  ];
}

function handleAttributeBindings(node, attributeBindings) {
  const properties = attributeBindings.map(item => ({
    type: 'ObjectProperty',
    key: formatObjectKey(item.name.name === 'className' ? 'class' : item.name.name),
    value: {
      type: 'ArrowFunctionExpression',
      params: [],
      body: item.value.expression
    }
  }));
  transformAttributeBinding(node, properties);
}

function handleObservedAttributes(node, attributes) {
  const properties = attributes.map(item => {
    return {
      type: 'ObjectProperty',
      key: formatObjectKey(item.name.name.name),
      value: {
        type: 'ArrowFunctionExpression',
        body: !item.value ? { type: 'StringLiteral', value: '' } : (item.value.type === 'JSXExpressionContainer' ? item.value.expression : item.value),
        params: []
      }
    };
  });
  transformAttributeBinding(node, properties);
}

function handleAttributes(node, attributes) {
  addImport(SET_ATTRIBUTES);
  const originalNode = { ...node };
  node.type = 'CallExpression';
  node.callee = {
    type: 'Identifier',
    name: SET_ATTRIBUTES
  };
  node.arguments = [
    originalNode,
    {
      type: 'ObjectExpression',
      properties: attributes.map(item => {
        const attrName = formatObjectKey(item.name.name === 'className' ? 'class' : item.name.name);
        return {
          type: 'ObjectProperty',
          key: attrName,
          value: item.value || { type: 'StringLiteral', value: '' }
        }
      })
    }
  ];
}

function handleEvents(node, events) {
  addImport(ADD_EVENT_LISTENER);
  events.forEach(item => {
    const originalNode = { ...node };
    const isPreventDefault = item.name.namespace.name === 'on-prevent';
    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: ADD_EVENT_LISTENER
    };
    node.arguments = [
      originalNode,
      {
        type: 'StringLiteral',
        value: item.name.name.name
      },
      item.value.expression
    ];
    if (isPreventDefault) {
      node.arguments.push({
        type: 'BooleanLiteral',
        value: true
      });
    }
  });
}

function handleChildren(node) {
  addImport(APPEND_CHILDREN);
  const originalNode = { ...node };
  node.type = 'CallExpression';
  node.callee = {
    type: 'Identifier',
    name: APPEND_CHILDREN
  };
  node.arguments = [
    originalNode,
    {
      type: 'ArrayExpression',
      elements: node.children.map(child => {
        
        if (child.type === 'JSXText') {
          addImport(CREATE_TEXT_NODE);
          child.type = 'CallExpression';
          child.callee = {
            type: 'Identifier',
            name: CREATE_TEXT_NODE
          };
          child.arguments = [
            {
              type: 'StringLiteral',
              value: child.value
            }
          ];
        }
        
        if (child.type === 'JSXExpressionContainer') {
          addImport(TEXT_BINDING);
          child.type = 'CallExpression';
          child.callee = {
            type: 'Identifier',
            name: TEXT_BINDING
          };
          child.arguments = [
            CONTEXT,
            {
              type: 'ArrowFunctionExpression',
              params: [],
              body: child.expression
            }
          ];
        }
        
        return child;
      })
    }
  ];
}

function addImport(name) {
  let coreImports = [];
  programPathGetter().node.body.forEach(item => {
    if (item.type === 'ImportDeclaration' && item.source.value === CORE_PACKAGE) {
      coreImports.push(item);
    }
  });

  let hasImport = false;
  coreImports.forEach(item => {
    item.specifiers.forEach(item2 => {
      if (item2.imported.name === name) {
        hasImport = true;
      }
    });
  });

  if (!hasImport && coreImports.length > 0) {
    coreImports[0].specifiers.push({
      type: 'ImportSpecifier',
      imported: {
        type: 'Identifier',
        name: name
      }
    });
  }
  if (!hasImport && coreImports.length === 0) {
    programPathGetter().node.body = [
      {
        type: 'ImportDeclaration',
        source: {
          type: 'StringLiteral',
          value: CORE_PACKAGE
        },
        specifiers: [
          {
            type: 'ImportSpecifier',
            imported: {
              type: 'Identifier',
              name: name
            }
          }
        ]
      },
      ...programPathGetter().node.body
    ];
  }
}

function transformDirective(node, directives) {
  if (directives.length > 0) {
    addImport(VIEW_DIRECTIVE);

    const originalNode = { ...node };
    const directiveObject = {};

    directives.forEach(directive => {
      const namespace = directive.name.namespace.name;
      if (!directiveObject[namespace]) {
        directiveObject[namespace] = [];
      }
      directiveObject[namespace].push(directive);
    });

    const arr = {
      type: 'ArrayExpression',
      elements: []
    };
    for (const [key, value] of Object.entries(directiveObject)) {
      arr.elements.push({
        type: 'ObjectExpression',
        properties: [
          {
            type: 'ObjectProperty',
            key: {
              type: 'Identifier',
              name: 'n',
            },
            value: {
              type: 'StringLiteral',
              value: key
            }
          },
          {
            type: 'ObjectProperty',
            key: {
              type: 'Identifier',
              name: 'd',
            },
            value: {
              type: 'ObjectExpression',
              properties: value.map(item => {
                
                if (!item.value) {
                  item.value = {
                    type: 'StringLiteral',
                    value: ''
                  };
                }
                
                const properties = [
                  {
                    type: 'ObjectProperty',
                    key: {
                      type: 'Identifier',
                      name: 'get'
                    },
                    value: {
                      type: 'ArrowFunctionExpression',
                      params: [],
                      body: item.value.expression || item.value
                    }
                  }
                ];

                if (
                  !!item.value.expression
                  && (
                    item.value.expression.type === 'MemberExpression'
                    || item.value.expression.type === 'ThisExpression'
                    || item.value.expression.type === 'Identifier'
                  )
                ) {
                  properties.push({
                    type: 'ObjectProperty',
                    key: {
                      type: 'Identifier',
                      name: 'set'
                    },
                    value: {
                      type: 'ArrowFunctionExpression',
                      params: [
                        {
                          type: 'Identifier',
                          name: 'θdr'
                        }
                      ],
                      body: {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: item.value.expression,
                        right: {
                          type: 'Identifier',
                          name: 'θdr'
                        }
                      }
                    }
                  });
                }

                return {
                  type: 'ObjectProperty',
                  key: {
                    type: 'Identifier',
                    name: kebabToCamel(item.name.name.name)
                  },
                  value: {
                    type: 'ObjectExpression',
                    properties
                  }
                }
              })
            }
          },
        ]
      });
    }

    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: VIEW_DIRECTIVE
    };
    node.arguments = [
      CONTEXT,
      originalNode,
      arr
    ];
  }
}

function camelToKebab(value) {
  const newVal = value.split('').map((letter, index) => {
    if (letter.match(/^[A-Z]/)) {
      return `${index !== 0 ? '-' : ''}${letter.toLowerCase()}`;
    }
    return letter;
  }).join('');

  return newVal.replace(/-+/g, '-');
}

function formatObjectKey(name) {
  if (name.indexOf('-') > 0) {
    return {
      type: 'StringLiteral',
      value: name
    }
  }
  return {
    type: 'Identifier',
    name: name
  }
}

function kebabToCamel(str) {
  return str.replace(/-./g, x => x[1].toUpperCase());
}

function getListItem() {
  listRenderingItemCount++;
  return 'θit' + listRenderingItemCount;
}

function getListIndex() {
  listRenderingIndexCount++;
  return 'θin' + listRenderingIndexCount;
}