"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.message = exports.resolveApp = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = require('path');

const appDirectory = _fs.default.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

exports.resolveApp = resolveApp;
const message = {
  success(text) {
    return _chalk.default.green.bold(text);
  },

  error(text) {
    return _chalk.default.red.bold(text);
  }

};
exports.message = message;