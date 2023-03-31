"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asDto = asDto;
exports["default"] = void 0;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var mensajesDTO = /*#__PURE__*/_createClass(function mensajesDTO(_ref) {
  var _id = _ref._id,
    author = _ref.author,
    time = _ref.time,
    text = _ref.text;
  _classCallCheck(this, mensajesDTO);
  this.id = _id;
  this.author = author;
  this.text = text;
  this.time = time;
});
exports["default"] = mensajesDTO;
function asDto(prods) {
  if (Array.isArray(prods)) return prods.map(function (p) {
    return new mensajesDTO(p);
  });else return new mensajesDTO(prods);
}