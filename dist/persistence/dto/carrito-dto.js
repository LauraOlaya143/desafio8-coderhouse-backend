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
var CarritoDTO = /*#__PURE__*/_createClass(function CarritoDTO(_ref) {
  var _id = _ref._id,
    products = _ref.products;
  _classCallCheck(this, CarritoDTO);
  this.id = _id;
  this.productos = products;
});
exports["default"] = CarritoDTO;
var CarritoFsDTO = /*#__PURE__*/_createClass(function CarritoFsDTO(_ref2) {
  var id = _ref2.id,
    products = _ref2.products;
  _classCallCheck(this, CarritoFsDTO);
  this.id = id;
  this.productos = products;
});
function asDto(prods) {
  var pers = (0, _factory.getPersistence)(prods);
  _logger["default"].info("persistencia: ".concat(pers));
  switch (pers) {
    case "fs":
      if (Array.isArray(prods)) return prods.map(function (p) {
        return new CarritoFsDTO(p);
      });else return new CarritoFsDTO(prods);
      break;
    default:
      if (Array.isArray(prods)) return prods.map(function (p) {
        return new CarritoDTO(p);
      });else return new CarritoDTO(prods);
      break;
  }
}