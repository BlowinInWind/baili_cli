/** @format */

import commander from 'commander';
import packageJson from '../package.json';
let program = new commander.Command();
import inquirer from 'inquirer';
let prompt = inquirer.prompt;
import download from './utils/download';
import ora from 'ora';
import symbol from 'log-symbols';
import fs from 'fs';
import { resolveApp, message } from './utils/index';
import install from './install';
import inquireConfig, { add, remove } from './utils/inquireConfig';
import createModule from './create/module';

program.version(packageJson.version).name(packageJson.name);

// import path from 'path';
// const cacheFileName = path.resolve(__dirname, './utils/template.json');

// 新建项目
program
    .command('init')
    .alias('i')
    .description('创建一个新项目')
    .action(() => {
        prompt(inquireConfig).then(params => {
            if (!fs.existsSync(params.name)) {
                let loading = ora('下载模板中 ...');
                loading.start();
                // 下载项目
                download(params.type, `${resolveApp(params.name)}`)
                    .then(res => {
                        loading.stop();
                        return res;
                    })
                    .then(
                        res => {
                            fs.readFile(
                                `${resolveApp(params.name)}/package.json`,
                                'utf8',
                                function (err, data) {
                                    // 获取package.json文件
                                    const createPackageJson = JSON.parse(data);
                                    createPackageJson.name = params.name;
                                    createPackageJson.version = params.version;
                                    createPackageJson.description =
                                        params.description;
                                    const updatePackageJson = JSON.stringify(
                                        createPackageJson,
                                        null,
                                        2
                                    );
                                    fs.writeFile(
                                        `${resolveApp(
                                            params.name
                                        )}/package.json`,
                                        updatePackageJson,
                                        'utf8',
                                        function (err) {
                                            if (err) {
                                                console.error(err);
                                                return;
                                            } else {
                                                console.log(
                                                    symbol.success,
                                                    message.success(
                                                        '项目下载成功！'
                                                    )
                                                );
                                                // 自动npm
                                                install({
                                                    success: () => {
                                                        console.log(
                                                            symbol.success,
                                                            message.success(
                                                                '项目初始化完成！'
                                                            )
                                                        );
                                                    },
                                                    cwd: `${resolveApp(
                                                        params.name
                                                    )}`
                                                });
                                            }
                                        }
                                    );
                                }
                            );
                        },
                        err => {
                            console.log(
                                symbol.error,
                                message.error('项目下载失败！')
                            );
                            console.error(err);
                            return;
                        }
                    );
            } else {
                console.log(symbol.error, message.error('当前项目已存在'));
                process.exit();
            }
        });
    });

program
    .command('create')
    .alias('c')
    .description('创建一个新模块')
    .action(() => {
        new createModule().cr();
    });

//配置下载的模板
// program
//     .command('config')
//     .alias('c')
//     .description('自己配置下载模板等')
//     .action(action => {
//         let argvs = [...process.argv.slice(3)];
//         if (argvs[0] == 'remove') {
//             remove(...process.argv.slice(3));
//         } else {
//             add(...process.argv.slice(3));
//         }

//         // console.log(...process.argv.slice(3));
//     });

program.usage('<command> [options]');

function help() {
    console.log('\r\nUsage:');
    console.log('config add <key> <value>');
    console.log('config remove <key>');
    console.log('\r');
}
program.on('-h', help);
program.on('--help', help);

// const cmd = process.argv[2];
// if (!['i', 'init', 'c', 'config'].includes(cmd)) {
//     program.help();
// }

program.parse(process.argv);
