"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inquirer = _interopRequireDefault(require("inquirer"));

var _ora = _interopRequireDefault(require("ora"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _fs = _interopRequireDefault(require("fs"));

var _index = require("../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */
let prompt = _inquirer.default.prompt;

class Module {
  constructor() {}

  init() {
    const prompts = [];
    prompts.push({
      type: 'input',
      name: '模板名称',
      message: '请输入一个模板名称',

      validate(input) {
        if (!input) {
          return '模板名称不能为空！';
        }

        if (_fs.default.existsSync(`src/pages/${input}`)) {
          return '当前模板名称已存在, 请输入一个新的模板名称!';
        }

        return true;
      }

    });
    return prompt(prompts);
  }

  create() {
    this.init().then(params => {});
  }

}

var _default = Module;
exports.default = _default;