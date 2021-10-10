#!/usr/bin/env node
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const fs = require('fs');
const devConfig = require(path.join(process.cwd(), 'build/webpack.config.dev.js'));
const prodConfig = require(path.join(process.cwd(), 'build/webpack.config.prod.js'));

const args = process.argv.slice(2);

if (args[0] === 'start') {
    const compiler = webpack(devConfig);
    const server = new WebpackDevServer(compiler);

    server.listen(3000, '0.0.0.0', (err) => {
        console.log(err);
    });
} else if (args[0] === 'build') {
    webpack(prodConfig, (err, stats) => {
        if (err) console.log(err);
        if (stats.hasErrors()) {
            console.log(new Error('Build failed with errors.'));
        }
    });
} else {
    console.log('error command');
}
