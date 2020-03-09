"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (templateName, projeceName) => {
  let url = `direct:https://github.com/jiangtong/${templateName}.git`;
  return new Promise((resolve, reject) => {
    (0, _downloadGitRepo.default)(url, projeceName, {
      clone: true
    }, err => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};

exports.default = _default;