"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mensajesCollectionName = exports.MensajesModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var mensajesCollectionName = "mensajes";
exports.mensajesCollectionName = mensajesCollectionName;
var mensajesSchema = new _mongoose["default"].Schema({
  author: {
    type: Object
  },
  text: {
    type: String,
    required: true
  },
  time: {
    type: String
  }
});
var MensajesModel = _mongoose["default"].model(mensajesCollectionName, mensajesSchema);
exports.MensajesModel = MensajesModel;