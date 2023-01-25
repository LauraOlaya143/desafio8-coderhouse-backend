"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _logger = _interopRequireDefault(require("../utils/logger.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var info = function info(req, res, next) {
  var ruta = req.protocol + '://' + req.get('host') + req.originalUrl;
  var metodo = req.method;
  var objInfo = {
    ruta: ruta,
    metodo: metodo
  };
  _logger["default"].info(objInfo);
  next();
};
var _default = info;
exports["default"] = _default;