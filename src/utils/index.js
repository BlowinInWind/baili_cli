import fs from 'fs';
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
import chalk from 'chalk';

export const resolveApp = relativePath =>
    path.resolve(appDirectory, relativePath);

export const message = {
    success(text) {
        return chalk.green.bold(text);
    },
    error(text) {
        return chalk.red.bold(text);
    }
};
