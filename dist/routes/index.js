"use strict";

var _require = require('express'),
  Router = _require.Router;
var productos = require("../routes/productos");
var carritos = require("../routes/carrito");
var rutaPrincipal = Router();
rutaPrincipal.use("/productos", productos);
rutaPrincipal.use("/carrito", carritos);
module.exports = rutaPrincipal;