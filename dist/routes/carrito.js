"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _logger = _interopRequireDefault(require("../middlewares/logger.js"));
var Carrito = _interopRequireWildcard(require("../controller/carritoController.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rutaCarrito = (0, _express.Router)();
rutaCarrito.get("/:id/productos", _logger["default"], Carrito.getProductsByCar);
rutaCarrito.post("/", _logger["default"], Carrito.newCar);
rutaCarrito["delete"]("/:id", _logger["default"], Carrito.eliminarCarrito);
rutaCarrito.post("/:idCarrito/productos/:idProducto", _logger["default"], Carrito.guardarProductoEnCarrito);
rutaCarrito["delete"]("/:idCarrito/productos/:idProducto", _logger["default"], Carrito.eliminarProductoDelCarrito);
rutaCarrito.post("/comprar/:id", _logger["default"], Carrito.completarCompra);
var _default = rutaCarrito;
exports["default"] = _default;