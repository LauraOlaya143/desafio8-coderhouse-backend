"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asDto = asDto;
exports["default"] = void 0;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var userDTO = /*#__PURE__*/_createClass(function userDTO(_ref) {
  var username = _ref.username,
    email = _ref.email,
    direccion = _ref.direccion,
    foto = _ref.foto;
  _classCallCheck(this, userDTO);
  this.username = username;
  this.email = email;
  this.direccion = direccion;
  this.foto = foto;
});
exports["default"] = userDTO;
function asDto(prods) {
  if (Array.isArray(prods)) return prods.map(function (p) {
    return new userDTO(p);
  });else return new userDTO(prods);
}