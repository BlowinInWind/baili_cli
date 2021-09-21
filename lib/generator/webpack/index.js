module.exports = (generator, options = {}) => {
  generator.extendPackage({
    scripts: {
      dev: 'cross-env NODE_ENV=development webpack serve --config ./build/webpack.config.dev.js',
      build: 'cross-env NODE_ENV=production webpack --config ./build/webpack.config.prod.js',
    },
    devDependencies: {
      'cross-env': '^7.0.2',
      'clean-webpack-plugin': '^3.0.0',
      'css-loader': '^5.0.2',
      'file-loader': '^6.2.0',
      'url-loader': '^4.1.1',
      'html-webpack-plugin': '^4.5.0',
      'style-loader': '^2.0.0',
      'vue-loader': '^15.9.6',
      webpack: '^5.32.0',
      'webpack-cli': '^4.6.0',
      'webpack-dev-server': '^4.0.0',
      'webpack-merge': '^5.2.0',
    },
  });

  generator.render('./template', {
    hasBabel: options.features.includes('babel'),
    lintOnSave: options.lintOn.includes('save'),
  });
};
