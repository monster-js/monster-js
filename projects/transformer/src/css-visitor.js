const cssTree = require('css-tree');

module.exports = function(source, elKey) {
    const ast = cssTree.parse(source);

    cssTree.walk(ast, node => {
        if (node.type === 'Selector') {
            const children = [];
            let addAttributeSelector = true;

            node.children.forEach(item => {
                children.push(item);

                // add component attribute selector for the following array of selector types
                const selectorTypes = ['ClassSelector', 'IdSelector', 'TypeSelector', 'AttributeSelector'];
                if (selectorTypes.indexOf(item.type) > -1) {

                    // prevent adding the selector multiple times for the same element
                    // example: .class-selector#id-selector should not be .class-selector[componentElNumber]#id-selector[componentElNumber]
                    if (!addAttributeSelector) {
                        return;
                    }
                    addAttributeSelector = false;


                    children.push({
                        type: 'AttributeSelector',
                        name: {
                            type: 'Identifier',
                            name: elKey
                        },
                        matcher: null,
                        value: null,
                        flags: null
                    });
                } else {


                    // If encounter a combinator, set the flag to allow adding component attribute selector
                    if (item.type === 'Combinator') {
                        addAttributeSelector = true;
                    }


                }
            });

            node.children = children;
        }
    });

    return cssTree.generate(ast);
}
