module.exports = (generator, options = {}) => {
    generator.injectImports(generator.entryFile, `import { Router } from 'react-router-dom';`);

    generator.injectImports(generator.entryFile, `import Root, {history} from './routes';`);

    generator.injectRootOptions(
        generator.entryFile,
        `<Router history={history}>
            <Root />
        </Router>`,
    );

    generator.extendPackage({
        dependencies: {
            'react-router': '^5.1.2',
            'react-router-dom': '^5.1.2',
        },
    });

    generator.render('./template', {
        historyMode: options.historyMode,
    });
};
