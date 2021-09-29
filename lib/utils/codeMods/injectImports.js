const j = require('jscodeshift');
const addImport = require('./addImport');

module.exports = (content, data) => {
    const root = j(content);
    const lastImportDecl = root.find(j.ImportDeclaration).at(-1);

    addImport(
        { root: lastImportDecl, j },
        {
            specifier: {
                type: 'named',
                imported: 'defineComponent',
            },
            source: 'react-router-dom',
        },
    );

    // lastImportDecl.insertAfter(
    //     j.importDeclaration(
    //         [j.importDefaultSpecifier(j.identifier('Router'))],
    //         j.stringLiteral('react-router-dom'),
    //     ),
    // );

    console.log(root.toSource());
};
