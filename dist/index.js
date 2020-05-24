"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _package = _interopRequireDefault(require("../package.json"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _download = _interopRequireDefault(require("./utils/download"));

var _ora = _interopRequireDefault(require("ora"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _fs = _interopRequireDefault(require("fs"));

var _index = require("./utils/index");

var _install = _interopRequireDefault(require("./install"));

var _inquireConfig = _interopRequireWildcard(require("./utils/inquireConfig"));

var _module = _interopRequireDefault(require("./create/module"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */
let program = new _commander.default.Command();
let prompt = _inquirer.default.prompt;
program.version(_package.default.version).name(_package.default.name); // import path from 'path';
// const cacheFileName = path.resolve(__dirname, './utils/template.json');
// 新建项目

program.command('ts').alias('ts').description('创建一个新项目').action(() => {
  prompt(_inquireConfig.default).then(params => {
    if (!_fs.default.existsSync(params.name)) {
      let loading = (0, _ora.default)('下载模板中 ...');
      loading.start(); // 下载项目

      (0, _download.default)(params.type, `${(0, _index.resolveApp)(params.name)}`).then(res => {
        loading.stop();
        return res;
      }).then(res => {
        _fs.default.readFile(`${(0, _index.resolveApp)(params.name)}/package.json`, 'utf8', function (err, data) {
          // 获取package.json文件
          const createPackageJson = JSON.parse(data);
          createPackageJson.name = params.name;
          createPackageJson.version = params.version;
          createPackageJson.description = params.description;
          const updatePackageJson = JSON.stringify(createPackageJson, null, 2);

          _fs.default.writeFile(`${(0, _index.resolveApp)(params.name)}/package.json`, updatePackageJson, 'utf8', function (err) {
            if (err) {
              console.error(err);
              return;
            } else {
              console.log(_logSymbols.default.success, _index.message.success('项目下载成功！')); // 自动npm

              (0, _install.default)({
                success: () => {
                  console.log(_logSymbols.default.success, _index.message.success('项目初始化完成！'));
                },
                cwd: `${(0, _index.resolveApp)(params.name)}`
              });
            }
          });
        });
      }, err => {
        console.log(_logSymbols.default.error, _index.message.error('项目下载失败！'));
        console.error(err);
        return;
      });
    } else {
      console.log(_logSymbols.default.error, _index.message.error('当前项目已存在'));
      process.exit();
    }
  });
});
program.command('create').alias('c').description('创建一个新模块').action(() => {
  new _module.default().create();
}); //配置下载的模板
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
program.on('--help', help); // const cmd = process.argv[2];
// if (!['i', 'init', 'c', 'config'].includes(cmd)) {
//     program.help();
// }

program.parse(process.argv);