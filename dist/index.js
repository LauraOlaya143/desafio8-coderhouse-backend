"use strict";

var _server = _interopRequireDefault(require("./services/server"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var puerto = process.env.PORT || 8080;
_server["default"].listen(puerto, function () {
  console.log("servidor listo, puerto: ".concat(puerto));
});