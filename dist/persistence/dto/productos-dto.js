"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asDto = asDto;
exports["default"] = void 0;
var _factory = require("../daos/factory.js");
var _logger = _interopRequireDefault(require("../../utils/logger.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var ProductsDTO = /*#__PURE__*/_createClass(function ProductsDTO(_ref) {
  var _id = _ref._id,
    title = _ref.title,
    price = _ref.price,
    thumbnail = _ref.thumbnail,
    timestamp = _ref.timestamp,
    descripcion = _ref.descripcion,
    codigo = _ref.codigo,
    stock = _ref.stock;
  _classCallCheck(this, ProductsDTO);
  this.id = _id;
  this.title = title;
  this.price = price;
  this.thumbnail = thumbnail;
  this.timestamp = timestamp;
  this.descripcion = descripcion, this.codigo = codigo;
  this.stock = stock;
});
exports["default"] = ProductsDTO;
var ProductsFsDTO = /*#__PURE__*/_createClass(function ProductsFsDTO(_ref2) {
  var id = _ref2.id,
    title = _ref2.title,
    price = _ref2.price,
    thumbnail = _ref2.thumbnail,
    descripcion = _ref2.descripcion,
    stock = _ref2.stock;
  _classCallCheck(this, ProductsFsDTO);
  this.id = id;
  this.title = title;
  this.price = price;
  this.thumbnail = thumbnail;
  this.timestamp = timestamp;
  this.descripcion = descripcion, this.codigo = codigo;
  this.stock = stockcion, this.stock = stock;
});
function asDto(prods) {
  var pers = (0, _factory.getPersistence)(prods);
  _logger["default"].info("persistencia: ".concat(pers));
  switch (pers) {
    case "fs":
      if (Array.isArray(prods)) return prods.map(function (p) {
        return new ProductsFsDTO(p);
      });else return new ProductsFsDTO(prods);
      break;
    default:
      if (Array.isArray(prods)) return prods.map(function (p) {
        return new ProductsDTO(p);
      });else return new ProductsDTO(prods);
      break;
  }
}