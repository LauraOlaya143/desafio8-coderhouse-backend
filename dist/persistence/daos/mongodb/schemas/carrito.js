"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carritoCollectionName = exports.CarritoModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _productos = require("./productos.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var carritoCollectionName = "carritos";
exports.carritoCollectionName = carritoCollectionName;
var carritoSchema = new _mongoose["default"].Schema({
  products: {
    type: Array,
    "default": []
  }
});
var CarritoModel = _mongoose["default"].model(carritoCollectionName, carritoSchema);
exports.CarritoModel = CarritoModel;