"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _logger = _interopRequireDefault(require("../middlewares/logger.js"));
var _productosTestController = require("../controller/rest/productos-testController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rutaProductosTest = (0, _express.Router)();
rutaProductosTest.get("/", _logger["default"], _productosTestController.getProductosRandoms);
var _default = rutaProductosTest;
exports["default"] = _default;