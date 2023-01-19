"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _winston = _interopRequireDefault(require("winston"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var logConfiguration = {
  level: 'info',
  transports: [new _winston["default"].transports.Console({
    level: 'silly'
  }), new _winston["default"].transports.File({
    filename: './logs/error.log',
    level: 'error'
  }), new _winston["default"].transports.File({
    filename: './logs/warn.log',
    leve: "warn"
  })]
};
var logger = _winston["default"].createLogger(logConfiguration);
var _default = logger;
exports["default"] = _default;