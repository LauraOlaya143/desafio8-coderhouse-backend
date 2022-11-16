"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _productos = _interopRequireDefault(require("../routes/productos"));
var _carrito = _interopRequireDefault(require("../routes/carrito"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rutaPrincipal = (0, _express.Router)();
rutaPrincipal.use("/productos", _productos["default"]);
rutaPrincipal.use("/carrito", _carrito["default"]);
var _default = rutaPrincipal;
exports["default"] = _default;