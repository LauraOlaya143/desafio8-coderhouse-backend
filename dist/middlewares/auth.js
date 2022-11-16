"use strict";

var Config = require('../config/index');
var admin = function admin(req, res, next) {
  if (!Config.administrador) {
    return res.status(401).json({
      error: -1,
      descripcion: "Metodo no autorizado"
    });
  }
  next();
};
module.exports = admin;