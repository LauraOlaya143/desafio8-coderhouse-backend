"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _child_process = require("child_process");
var _path = _interopRequireDefault(require("path"));
var _minimist = _interopRequireDefault(require("minimist"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var direccion = _path["default"].resolve(__dirname, '../utils/calculo.js');
var objetoConfiguracion = {
  alias: {
    p: "port",
    m: "modo"
  },
  "default": {
    port: 8080,
    modo: "FOLK"
  }
};
var args = (0, _minimist["default"])(process.argv, objetoConfiguracion);
var puerto = args.port;
var rutaRandom = (0, _express.Router)();
rutaRandom.get('/', function (req, res) {
  var cant = req.query.cant;
  var cantidad = parseFloat(cant);
  var computo = (0, _child_process.fork)(direccion, [cantidad]);
  computo.send('inicio');
  computo.on("message", function (sum) {
    res.json({
      resultado: sum,
      PORT: puerto
    });
  });
});
var _default = rutaRandom;
exports["default"] = _default;