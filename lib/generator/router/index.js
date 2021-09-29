module.exports = (generator, options = {}) => {
    generator.injectImports(
        generator.entryFile,
        `import { Router } from 'react-router-dom';`,
    );

    generator.extendPackage({
        dependencies: {
            'react-router': '^5.1.2',
            'react-router-dom': '^5.1.2',
        },
    });
};
