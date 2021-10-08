module.exports = (generator, options = {}) => {
    generator.injectImports(generator.entryFile, `import { Provider } from 'react-redux';`);
    generator.injectImports(generator.entryFile, `import store from './store';`);

    generator.injectRootOptions(
        generator.entryFile,
        `<Provider store={store}>
         </Provider>`,
    );

    generator.extendPackage({
        dependencies: {
            '@reduxjs/toolkit': '^1.4.0',
            redux: '^4.0.5',
            'redux-thunk': '^2.3.0',
            'react-redux': '^7.2.0',
        },
    });

    generator.render('./template');
};
