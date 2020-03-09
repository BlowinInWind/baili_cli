import templateConfig from './template.json';
import fs from 'fs';
import { resolveApp } from './index';

const includes = (v, arr) => {
    return arr.findIndex(item => {
        return item.value === v;
    });
};

export const add = (...args) => {
    fs.readFile(`${resolveApp('src/utils/template.json')}`, 'utf8', function(
        err,
        data
    ) {
        const createPackageJson = JSON.parse(data);
        if (includes(args[2], templateConfig) > -1) {
            console.log('当前模板已存在！');
        } else {
            createPackageJson.push({ name: args[1], value: args[2] });

            const updatePackageJson = JSON.stringify(
                createPackageJson,
                null,
                2
            );
            fs.writeFile(
                `${resolveApp('src/utils/template.json')}`,
                updatePackageJson,
                'utf8',
                err => {
                    if (!err) {
                        console.log('添加模板成功！');
                    }
                }
            );
        }
    });
};

export const remove = (...args) => {
    fs.readFile(`${resolveApp('src/utils/template.json')}`, 'utf8', function(
        err,
        data
    ) {
        let createPackageJson = JSON.parse(data);
        if (includes(args[1], templateConfig) > -1) {
            createPackageJson = createPackageJson.filter(item => {
                return item.value != args[1];
            });
            const updatePackageJson = JSON.stringify(
                createPackageJson,
                null,
                2
            );
            fs.writeFile(
                `${resolveApp('src/utils/template.json')}`,
                updatePackageJson,
                'utf8',
                err => {
                    if (!err) {
                        console.log('删除模板成功！');
                    }
                }
            );
        } else {
            console.log('当前模板不存在！');
        }
    });
};

export default [
    {
        type: 'input',
        name: 'name',
        message: '项目名称：',
        default: '',
        filter(val) {
            return val.trim();
        },
        validate: function(val) {
            if (val.length > 0) {
                return true;
            }
            return '请输入项目名称';
        }
    },
    {
        type: 'list',
        name: 'type',
        message: '项目模板：',
        choices: templateConfig
    }
];
