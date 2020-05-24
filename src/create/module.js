/** @format */

import inquirer from 'inquirer';
let prompt = inquirer.prompt;

import ora from 'ora';
import symbol from 'log-symbols';
import fs from 'fs';
import { resolveApp, message } from '../utils/index';

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
                if (fs.existsSync(`src/pages/${input}`)) {
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

export default Module;
