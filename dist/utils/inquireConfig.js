"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.remove = exports.add = void 0;

var _template = _interopRequireDefault(require("./template.json"));

var _fs = _interopRequireDefault(require("fs"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const includes = (v, arr) => {
  return arr.findIndex(item => {
    return item.value === v;
  });
};

const add = (...args) => {
  _fs.default.readFile(`${(0, _index.resolveApp)('src/utils/template.json')}`, 'utf8', function (err, data) {
    const createPackageJson = JSON.parse(data);

    if (includes(args[2], _template.default) > -1) {
      console.log('当前模板已存在！');
    } else {
      createPackageJson.push({
        name: args[1],
        value: args[2]
      });
      const updatePackageJson = JSON.stringify(createPackageJson, null, 2);

      _fs.default.writeFile(`${(0, _index.resolveApp)('src/utils/template.json')}`, updatePackageJson, 'utf8', err => {
        if (!err) {
          console.log('添加模板成功！');
        }
      });
    }
  });
};

exports.add = add;

const remove = (...args) => {
  _fs.default.readFile(`${(0, _index.resolveApp)('src/utils/template.json')}`, 'utf8', function (err, data) {
    let createPackageJson = JSON.parse(data);

    if (includes(args[1], _template.default) > -1) {
      createPackageJson = createPackageJson.filter(item => {
        return item.value != args[1];
      });
      const updatePackageJson = JSON.stringify(createPackageJson, null, 2);

      _fs.default.writeFile(`${(0, _index.resolveApp)('src/utils/template.json')}`, updatePackageJson, 'utf8', err => {
        if (!err) {
          console.log('删除模板成功！');
        }
      });
    } else {
      console.log('当前模板不存在！');
    }
  });
};

exports.remove = remove;
var _default = [{
  type: 'input',
  name: 'name',
  message: '项目名称：',
  default: '',

  filter(val) {
    return val.trim();
  },

  validate: function (val) {
    if (val.length > 0) {
      return true;
    }

    return '请输入项目名称';
  }
}, {
  type: 'list',
  name: 'type',
  message: '项目模板：',
  choices: _template.default
}];
exports.default = _default;