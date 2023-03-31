"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graphqlSchema = exports.graphqlRoot = void 0;
var _graphql = require("graphql");
var _productosController = require("../../controller/graphql/productosController.js");
var _productosTestController = require("../../controller/graphql/productos-testController.js");
var _carritoController = require("../../controller/graphql/carritoController.js");
var _mensajesController = require("../../controller/graphql/mensajesController.js");
//Ruta de productos de la DB

//Ruta de productos generados de forma aleatoria

//Rutas del carrito

//Rutas de mensajes

var graphqlSchema = (0, _graphql.buildSchema)("\n    input InputProduct{\n        title: String!\n        price: Int!\n        thumbnail: String!\n        descripcion: String!\n        stock: Int!\n    }\n    input InputCarrito{\n        idProducto: String!\n    }\n    input InputMensaje{\n        username: String!\n        email: String!\n        direccion: String!\n        foto: String!\n        text: String!\n    }\n    type authorMensaje{\n        username: String!\n        email: String!\n        direccion: String!\n        foto: String!\n    }\n    type mensaje{\n        id: String!\n        author: authorMensaje!\n        text: String!\n        time: String!\n    }\n    type productRandom{\n        id: String!\n        title: String!\n        price: String!\n        thumbnail: String!\n        timestamp: String!\n        descripcion: String!\n        codigo: String!\n        stock: Int!\n    }\n    type product{\n        id: String!\n        title: String!\n        price: Int!\n        thumbnail: String!\n        descripcion: String!\n        stock: Int!\n    }\n    type carrito{\n        id: String!\n    }\n    type carritoProductos{\n        id: String!\n        title: String!\n        price: Int!\n        thumbnail: String!\n        descripcion: String!\n        codigo: String!\n        cantidad: Int!\n    }\n    type Query{\n        getAllProductsCtr:[product]\n        getProductByIdCtr(id:String!):product\n        productosRandomsCtr:[productRandom]\n        getProductsByCarCtr(id:String):[carritoProductos]\n        getAllMessagesCtr:[mensaje]\n    }\n    type Mutation{\n        newProductoCtr(data: InputProduct):product\n        editarProductoCtr(id: String!, data: InputProduct):product\n        eliminarProductoCtr(id: String!):String\n        newCarCtr:carrito\n        eliminarCarritoCtr(id: String!):String\n        guardarProductoEnCarritoCtr(id: String!, data: InputCarrito):String\n        eliminarProductoDelCarritoCtr(id: String!, data: InputCarrito):String\n        saveNewMessageCtr(data: InputMensaje):mensaje\n    }\n");
exports.graphqlSchema = graphqlSchema;
var graphqlRoot = {
  getAllProductsCtr: _productosController.getAllProductsCtr,
  getProductByIdCtr: _productosController.getProductByIdCtr,
  newProductoCtr: _productosController.newProductoCtr,
  editarProductoCtr: _productosController.editarProductoCtr,
  eliminarProductoCtr: _productosController.eliminarProductoCtr,
  productosRandomsCtr: _productosTestController.productosRandomsCtr,
  newCarCtr: _carritoController.newCarCtr,
  eliminarCarritoCtr: _carritoController.eliminarCarritoCtr,
  getProductsByCarCtr: _carritoController.getProductsByCarCtr,
  guardarProductoEnCarritoCtr: _carritoController.guardarProductoEnCarritoCtr,
  eliminarProductoDelCarritoCtr: _carritoController.eliminarProductoDelCarritoCtr,
  getAllMessagesCtr: _mensajesController.getAllMessagesCtr,
  saveNewMessageCtr: _mensajesController.saveNewMessageCtr
};
exports.graphqlRoot = graphqlRoot;