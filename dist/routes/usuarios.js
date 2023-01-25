"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _passport = _interopRequireDefault(require("passport"));
var _userController = require("../controller/userController.js");
var _logger = _interopRequireDefault(require("../middlewares/logger.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rutaUsuarios = (0, _express.Router)();
var passportOptions = {
  badRequestMessage: "Falta email / password"
};
var isLoggedIn = function isLoggedIn(req, res, next) {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) return res.status(401).json({
    msg: 'Unauthorized'
  });
  next();
};
rutaUsuarios.post('/signup', _logger["default"], _userController.signUp);
rutaUsuarios.post('/login', _logger["default"], _passport["default"].authenticate('login', passportOptions), _userController.login);
rutaUsuarios.get('/home', _logger["default"], isLoggedIn, _userController.getHome);
var _default = rutaUsuarios;
exports["default"] = _default;