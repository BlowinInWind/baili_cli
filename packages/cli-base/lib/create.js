const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');
const Creator = require('./Creator');
const PromptModuleAPI = require('./PromptModuleAPI');
const clearConsole = require('./utils/clearConsole');
const pkgJson = require('../package.json');
const Generator = require('./Generator');
const executeCommand = require('./utils/executeCommand');
const writeFileTree = require('./utils/writeFileTree');

const create = async (name) => {
    const targetDir = path.join(process.cwd(), name);
    // 如果目标目录已存在，询问是覆盖还是合并
    if (fs.existsSync(targetDir)) {
        // 清空控制台
        clearConsole();

        const { action } = await inquirer.prompt([
            {
                name: 'action',
                type: 'list',
                message: `当前目录下存在${chalk.cyan(targetDir)}。请选择:`,
                choices: [
                    { name: '覆盖', value: 'overwrite' },
                    { name: '合并', value: 'merge' },
                ],
            },
        ]);

        if (action === 'overwrite') {
            console.log(`\n删除${chalk.cyan(targetDir)}中...`);
            await fs.remove(targetDir);
        }
    }

    let creator = new Creator();

    // 获取各个模块的交互提示语
    const promptModules = getPromptModules();

    const promptAPI = new PromptModuleAPI(creator);
    promptModules.forEach((m) => m(promptAPI));

    clearConsole();

    // package.json 文件内容
    const pkg = {
        name,
        version: pkgJson.version,
        dependencies: {},
        devDependencies: {},
    };

    const answers = await inquirer.prompt(creator.getFinalPrompts());

    const generator = new Generator(pkg, path.join(process.cwd(), name));

    // 填入 cli-service 必选项，无需用户选择
    // 填入 react webpack 必选项，无需用户选择
    answers.features.unshift('react', 'babel', 'service');
    // answers.features.forEach((feature) => {
    //     if (feature !== 'service') {
    //         pkg.devDependencies[`cli-plugin-${feature}`] = '^1.0.0';
    //     } else {
    //         pkg.devDependencies['cli-service'] = '^1.0.0';
    //     }
    // });

    // await writeFileTree(targetDir, {
    //     'package.json': JSON.stringify(pkg, null, 2),
    // });

    // 下载依赖
    // 提前下载需要的本地cli-plugin的依赖
    // await executeCommand(path.join(process.cwd(), name));

    // 根据用户选择的选项加载相应的模块，在 package.json 写入对应的依赖项
    // 并且将对应的 template 模块渲染
    answers.features.forEach((feature) => {
        if (feature !== 'service') {
            require(`cli-plugin-${feature}/generator`)(generator, answers);
        } else {
            require(`cli-service/generator`)(generator, answers);
        }
    });

    // answers.features.forEach((feature) => {
    //     require(`./generator/${feature}`)(generator, answers);
    // });

    await generator.generate();

    console.log('\n正在下载依赖...\n');
    // 下载依赖
    await executeCommand(path.join(process.cwd(), name));
    console.log('\n依赖下载完成! 执行下列命令开始开发：\n');
    console.log(`cd ${name}`);
    console.log(`npm run start`);
};

const getPromptModules = () => {
    return ['styles', 'router', 'redux', 'linter', 'commitizen'].map((file) =>
        require(`cli-plugin-${file}/prompts.js`),
    );
};

module.exports = create;
