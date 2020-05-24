"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _which = _interopRequireDefault(require("which"));

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runCmd({
  cmd,
  cwd,
  success,
  params
}) {
  params = params || [];
  const runner = (0, _child_process.spawn)(cmd, params, {
    cwd,
    stdio: 'inherit'
  });
  runner.on('close', function (code) {
    success && success(code);
  });
}

function findNpm() {
  const npms = process.platform === 'win32' ? ['yarn.cmd', 'tnpm.cmd', 'cnpm.cmd', 'npm.cmd'] : ['yarn', 'tnpm', 'cnpm', 'npm'];

  for (var i = 0; i < npms.length; i++) {
    try {
      _which.default.sync(npms[i]);

      console.log('use npm: ' + npms[i]);
      return npms[i];
    } catch (e) {}
  }

  throw new Error('please install npm');
}

var _default = ({
  success,
  cwd
}) => {
  const npm = findNpm();
  runCmd({
    cmd: _which.default.sync(npm),
    params: ['install'],
    success,
    cwd
  });
};

exports.default = _default;