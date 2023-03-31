"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _logger = _interopRequireDefault(require("../middlewares/logger.js"));
var _randomsController = require("../controller/rest/randomsController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rutaRandom = (0, _express.Router)();
rutaRandom.get('/:cant', _logger["default"], _randomsController.getRandoms);
var _default = rutaRandom;
exports["default"] = _default;