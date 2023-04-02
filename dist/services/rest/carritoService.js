"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guardarProducto = exports.getCarById = exports.deleteProductoById = exports.deleteCartById = exports.crearCarrito = exports.carritoServices = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _carritoRepository = require("../../persistence/repository/carritoRepository.js");
var _productosRepository = _interopRequireDefault(require("../../persistence/repository/productosRepository.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var productsRepository = new _productosRepository["default"]();
var CarritoAPI = /*#__PURE__*/function () {
  function CarritoAPI() {
    _classCallCheck(this, CarritoAPI);
  }
  _createClass(CarritoAPI, [{
    key: "exists",
    value: function () {
      var _exists = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id) {
        var arrayCarritos, indice;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _carritoRepository.getAll)();
              case 2:
                arrayCarritos = _context.sent;
                indice = arrayCarritos.findIndex(function (prod) {
                  return prod.id == id;
                });
                return _context.abrupt("return", indice >= 0);
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function exists(_x) {
        return _exists.apply(this, arguments);
      }
      return exists;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id) {
        var existe, carrito, productosDelCarrito;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.exists(id);
              case 2:
                existe = _context2.sent;
                if (existe) {
                  _context2.next = 5;
                  break;
                }
                throw (0, _httpErrors["default"])(404, 'carrito no encontrado :c');
              case 5:
                _context2.next = 7;
                return (0, _carritoRepository.getById)(id);
              case 7:
                carrito = _context2.sent;
                productosDelCarrito = carrito.productos;
                return _context2.abrupt("return", productosDelCarrito);
              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function getById(_x2) {
        return _getById2.apply(this, arguments);
      }
      return getById;
    }()
  }, {
    key: "saveNewCar",
    value: function () {
      var _saveNewCar = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var carrito;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _carritoRepository.crearNuevoCarrito)();
              case 2:
                carrito = _context3.sent;
                return _context3.abrupt("return", carrito);
              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      function saveNewCar() {
        return _saveNewCar.apply(this, arguments);
      }
      return saveNewCar;
    }()
  }, {
    key: "saveNewProduct",
    value: function () {
      var _saveNewProduct = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(producto, idCarrito) {
        var existe, cantidad, newProduct, title, price, thumbnail, id, descripcion, codigo, carrito, productosDelCarrito, indiceProducto, productoYaExiste, newCantidad, update;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.exists(idCarrito);
              case 2:
                existe = _context4.sent;
                cantidad = 1;
                newProduct = {};
                title = producto.title, price = producto.price, thumbnail = producto.thumbnail, id = producto.id, descripcion = producto.descripcion, codigo = producto.codigo;
                if (existe) {
                  _context4.next = 8;
                  break;
                }
                throw (0, _httpErrors["default"])(404, 'carrito no encontrado :c');
              case 8:
                _context4.next = 10;
                return (0, _carritoRepository.getById)(idCarrito);
              case 10:
                carrito = _context4.sent;
                productosDelCarrito = carrito.productos;
                indiceProducto = productosDelCarrito.findIndex(function (prod) {
                  return prod.id == id;
                });
                if (indiceProducto >= 0) {
                  productoYaExiste = productosDelCarrito[indiceProducto];
                  newCantidad = productoYaExiste.cantidad;
                  cantidad = cantidad + newCantidad;
                  newProduct = {
                    title: title,
                    price: price,
                    thumbnail: thumbnail,
                    id: id,
                    descripcion: descripcion,
                    codigo: codigo,
                    cantidad: cantidad
                  };
                  productosDelCarrito.splice(indiceProducto, 1, newProduct);
                } else {
                  newProduct = {
                    title: title,
                    price: price,
                    thumbnail: thumbnail,
                    id: id,
                    descripcion: descripcion,
                    codigo: codigo,
                    cantidad: cantidad
                  };
                  productosDelCarrito.push(newProduct);
                }

                //const update = await MongoCarritoController.updateCarrito(idCarrito, productosDelCarrito)
                _context4.next = 16;
                return (0, _carritoRepository.agregarProducto)(idCarrito, productosDelCarrito);
              case 16:
                update = _context4.sent;
                return _context4.abrupt("return", productosDelCarrito);
              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function saveNewProduct(_x3, _x4) {
        return _saveNewProduct.apply(this, arguments);
      }
      return saveNewProduct;
    }()
  }, {
    key: "deleteCartById",
    value: function () {
      var _deleteCartById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id) {
        var existe, carritoEliminado;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.exists(id);
              case 2:
                existe = _context5.sent;
                if (existe) {
                  _context5.next = 5;
                  break;
                }
                throw (0, _httpErrors["default"])(404, 'carrito no encontrado :c');
              case 5:
                _context5.next = 7;
                return (0, _carritoRepository.eliminarCarrito)(id);
              case 7:
                carritoEliminado = _context5.sent;
                return _context5.abrupt("return", "eliminando el carrito con el id: ".concat(id));
              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function deleteCartById(_x5) {
        return _deleteCartById.apply(this, arguments);
      }
      return deleteCartById;
    }()
  }, {
    key: "deleteProductoById",
    value: function () {
      var _deleteProductoById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(idCarrito, idProducto) {
        var existe, carrito, productos, productoIndice, update;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.exists(idCarrito);
              case 2:
                existe = _context6.sent;
                if (existe) {
                  _context6.next = 5;
                  break;
                }
                throw (0, _httpErrors["default"])(404, 'carrito no encontrado :c');
              case 5:
                _context6.next = 7;
                return (0, _carritoRepository.getById)(idCarrito);
              case 7:
                carrito = _context6.sent;
                productos = carrito.productos;
                productoIndice = productos.findIndex(function (prod) {
                  return prod.id == idProducto;
                });
                productos.splice(productoIndice, 1);

                // const update = await MongoCarritoController.updateCarrito(idCarrito, productos)
                _context6.next = 13;
                return (0, _carritoRepository.agregarProducto)(idCarrito, productos);
              case 13:
                update = _context6.sent;
                return _context6.abrupt("return", "se elimino el producto con el id ".concat(idProducto, " del carrito con el id ").concat(idCarrito));
              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function deleteProductoById(_x6, _x7) {
        return _deleteProductoById.apply(this, arguments);
      }
      return deleteProductoById;
    }()
  }]);
  return CarritoAPI;
}(); // funciones para graphql
var crearCarrito = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var carrito;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _carritoRepository.crearNuevoCarrito)();
          case 2:
            carrito = _context7.sent;
            return _context7.abrupt("return", carrito);
          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function crearCarrito() {
    return _ref.apply(this, arguments);
  };
}();
exports.crearCarrito = crearCarrito;
var getCarById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(id) {
    var arrayCarritos, indice, existe, carrito, productosDelCarrito;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _carritoRepository.getAll)();
          case 2:
            arrayCarritos = _context8.sent;
            indice = arrayCarritos.findIndex(function (prod) {
              return prod.id == id;
            });
            existe = indice >= 0;
            if (existe) {
              _context8.next = 7;
              break;
            }
            throw (0, _httpErrors["default"])(404, 'carrito no encontrado');
          case 7:
            _context8.next = 9;
            return (0, _carritoRepository.getById)(id);
          case 9:
            carrito = _context8.sent;
            productosDelCarrito = carrito.productos;
            return _context8.abrupt("return", productosDelCarrito);
          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return function getCarById(_x8) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getCarById = getCarById;
var exists = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(id) {
    var arrayCarritos, indice;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _carritoRepository.getAll)();
          case 2:
            arrayCarritos = _context9.sent;
            indice = arrayCarritos.findIndex(function (prod) {
              return prod.id == id;
            });
            return _context9.abrupt("return", indice >= 0);
          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return function exists(_x9) {
    return _ref3.apply(this, arguments);
  };
}();
var guardarProducto = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(idCarrito, newObj) {
    var existe, cantidad, newProduct, id, producto, title, price, thumbnail, descripcion, codigo, carrito, productosDelCarrito, indiceProducto, productoYaExiste, newCantidad, update;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            existe = exists(idCarrito);
            cantidad = 1;
            newProduct = {};
            id = newObj.idProducto;
            console.log(id);
            _context10.next = 7;
            return productsRepository.getById(id);
          case 7:
            producto = _context10.sent;
            title = producto.title, price = producto.price, thumbnail = producto.thumbnail, descripcion = producto.descripcion, codigo = producto.codigo;
            if (existe) {
              _context10.next = 11;
              break;
            }
            throw (0, _httpErrors["default"])(404, 'carrito no encontrado :c');
          case 11:
            _context10.next = 13;
            return (0, _carritoRepository.getById)(idCarrito);
          case 13:
            carrito = _context10.sent;
            productosDelCarrito = carrito.productos;
            indiceProducto = productosDelCarrito.findIndex(function (prod) {
              return prod.id == id;
            });
            if (indiceProducto >= 0) {
              productoYaExiste = productosDelCarrito[indiceProducto];
              newCantidad = productoYaExiste.cantidad;
              cantidad = cantidad + newCantidad;
              newProduct = {
                title: title,
                price: price,
                thumbnail: thumbnail,
                id: id,
                descripcion: descripcion,
                codigo: codigo,
                cantidad: cantidad
              };
              productosDelCarrito.splice(indiceProducto, 1, newProduct);
            } else {
              newProduct = {
                title: title,
                price: price,
                thumbnail: thumbnail,
                id: id,
                descripcion: descripcion,
                codigo: codigo,
                cantidad: cantidad
              };
              productosDelCarrito.push(newProduct);
            }
            _context10.next = 19;
            return (0, _carritoRepository.agregarProducto)(idCarrito, productosDelCarrito);
          case 19:
            update = _context10.sent;
            return _context10.abrupt("return", productosDelCarrito);
          case 21:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return function guardarProducto(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
exports.guardarProducto = guardarProducto;
var deleteCartById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(id) {
    var carritoEliminado;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return (0, _carritoRepository.eliminarCarrito)(id);
          case 2:
            carritoEliminado = _context11.sent;
            return _context11.abrupt("return", "eliminando el carrito con el id: ".concat(id));
          case 4:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return function deleteCartById(_x12) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deleteCartById = deleteCartById;
var deleteProductoById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(idCarrito, idProducto) {
    var carrito, productos, productoIndice, update;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return (0, _carritoRepository.getById)(idCarrito);
          case 2:
            carrito = _context12.sent;
            productos = carrito.productos;
            productoIndice = productos.findIndex(function (prod) {
              return prod.id == idProducto;
            });
            productos.splice(productoIndice, 1);
            _context12.next = 8;
            return (0, _carritoRepository.agregarProducto)(idCarrito, productos);
          case 8:
            update = _context12.sent;
            return _context12.abrupt("return", "se elimino el producto con el id ".concat(idProducto, " del carrito con el id ").concat(idCarrito));
          case 10:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return function deleteProductoById(_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();
exports.deleteProductoById = deleteProductoById;
var carritoServices = new CarritoAPI();
exports.carritoServices = carritoServices;