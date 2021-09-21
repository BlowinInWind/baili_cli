const path = require('path');
const inquirer = require('inquirer');
const Creator = require('./Creator');
const PromptModuleAPI = require('./PromptModuleAPI');
const clearConsole = require('./utils/clearConsole');
const pkgJson = require('../package.json');
const Generator = require('./Generator');

const create = async (name) => {
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

  // 填入 react webpack 必选项，无需用户选择
  // answers.features.unshift('react', 'webpack');

  // 根据用户选择的选项加载相应的模块，在 package.json 写入对应的依赖项
  // 并且将对应的 template 模块渲染

  ['webpack'].forEach((feature) => {
    require(`./generator/${feature}`)(generator, answers);
  });

  await generator.generate();
};

const getPromptModules = () => {
  return ['babel', 'router', 'redux', 'linter'].map((file) => require(`./promptModules/${file}`));
};

module.exports = create;
