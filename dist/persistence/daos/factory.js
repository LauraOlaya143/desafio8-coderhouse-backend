"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDao = getDao;
var _productosMongo = _interopRequireDefault(require("./mongodb/productosMongo.js"));
var _BDproductos = _interopRequireDefault(require("./SQL/BDproductos.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var dao;
var argv = process.argv[2];
switch (argv) {
  case "sql":
    dao = new _productosMongo["default"]();
    console.log("Se eligio SQL a partir de los comandos: ".concat(argv));
    break;
  default:
    dao = new _productosMongo["default"]();
    console.log(argv);
    break;
}
function getDao() {
  return dao;
}