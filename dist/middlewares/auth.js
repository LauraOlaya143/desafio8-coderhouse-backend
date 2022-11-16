"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _index = _interopRequireDefault(require("../config/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var admin = function admin(req, res, next) {
  if (!_index["default"].administrador) {
    return res.status(401).json({
      error: -1,
      descripcion: "Metodo no autorizado"
    });
  }
  next();
};
var _default = admin;
exports["default"] = _default;