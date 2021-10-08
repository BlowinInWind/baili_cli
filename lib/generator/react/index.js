module.exports = (generator, options = {}) => {
    generator.injectImports(generator.entryFile, `import Index from './pages/Index';`);

    generator.injectRootOptions(
        generator.entryFile,
        `<Index>
        </Index>`,
    );

    generator.extendPackage({
        devDependencies: {
            '@pmmmwh/react-refresh-webpack-plugin': '^0.4.3',
            'react-refresh': '^0.10.0',
        },
        dependencies: {
            react: '^17.0.1',
            'react-dom': '^17.0.1',
        },
    });

    generator.render('./template');
};
