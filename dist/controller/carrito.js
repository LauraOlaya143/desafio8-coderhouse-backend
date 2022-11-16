"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var createError = require('http-errors');
var fs = require('fs/promises');
var path = require('path');
var filePath = path.resolve(__dirname, '../../carritos.json');
var CarritoAPI = /*#__PURE__*/function () {
  function CarritoAPI(archivo) {
    _classCallCheck(this, CarritoAPI);
    this.archivo = archivo;
  }
  _createClass(CarritoAPI, [{
    key: "exists",
    value: function () {
      var _exists = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id) {
        var carrito, arrayCarritos, indice;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fs.readFile(filePath, 'utf8');
              case 2:
                carrito = _context.sent;
                arrayCarritos = JSON.parse(carrito);
                indice = arrayCarritos.findIndex(function (prod) {
                  return prod.id == id;
                });
                return _context.abrupt("return", indice >= 0);
              case 6:
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
      var _getById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id) {
        var carrito, arrayCarrito, existe, indice, carritoSeleccionado, productosDelCarrito;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fs.readFile(filePath, 'utf8');
              case 2:
                carrito = _context2.sent;
                arrayCarrito = JSON.parse(carrito);
                _context2.next = 6;
                return this.exists(id);
              case 6:
                existe = _context2.sent;
                if (existe) {
                  _context2.next = 9;
                  break;
                }
                throw createError(404, 'carrito no encontrado');
              case 9:
                indice = arrayCarrito.findIndex(function (prod) {
                  return prod.id == id;
                });
                carritoSeleccionado = arrayCarrito[indice];
                productosDelCarrito = carritoSeleccionado.products;
                return _context2.abrupt("return", productosDelCarrito);
              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function getById(_x2) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
  }, {
    key: "saveNewCar",
    value: function () {
      var _saveNewCar = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var carrito, arrayCarrito, newId, intId, product, newData;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return fs.readFile(filePath, 'utf8');
              case 2:
                carrito = _context3.sent;
                arrayCarrito = JSON.parse(carrito);
                newId = 1;
                if (arrayCarrito.length) {
                  newId = arrayCarrito[arrayCarrito.length - 1].id + 1;
                }
                intId = Math.floor(newId);
                product = {
                  id: intId,
                  products: []
                };
                arrayCarrito.push(product);
                newData = JSON.stringify(arrayCarrito, null, "\t");
                _context3.next = 12;
                return fs.writeFile(filePath, newData);
              case 12:
                return _context3.abrupt("return", product);
              case 13:
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
        var carrito, arrayCarrito, existe, indiceCarrito, cantidad, title, price, thumbnail, id, timestamp, descripcion, codigo, carritoSeleccionado, productosDelCarrito, indiceProducto, productoYaExiste, newCantidad, _boolean, newProduct, carritoActualizado, newData;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return fs.readFile(filePath, 'utf8');
              case 2:
                carrito = _context4.sent;
                arrayCarrito = JSON.parse(carrito);
                _context4.next = 6;
                return this.exists(idCarrito);
              case 6:
                existe = _context4.sent;
                indiceCarrito = arrayCarrito.findIndex(function (prod) {
                  return prod.id == idCarrito;
                });
                cantidad = 1;
                title = producto.title, price = producto.price, thumbnail = producto.thumbnail, id = producto.id, timestamp = producto.timestamp, descripcion = producto.descripcion, codigo = producto.codigo;
                if (existe) {
                  _context4.next = 12;
                  break;
                }
                throw createError(404, 'carrito no encontrado');
              case 12:
                carritoSeleccionado = arrayCarrito[indiceCarrito];
                productosDelCarrito = carritoSeleccionado.products;
                indiceProducto = productosDelCarrito.findIndex(function (prod) {
                  return prod.id == id;
                });
                productoYaExiste = productosDelCarrito[indiceProducto];
                if (productoYaExiste) {
                  newCantidad = productoYaExiste.cantidad;
                  cantidad = cantidad + newCantidad;
                }
                _boolean = indiceProducto >= 0;
                if (!_boolean) {
                  newProduct = {
                    title: title,
                    price: price,
                    thumbnail: thumbnail,
                    id: id,
                    timestamp: timestamp,
                    descripcion: descripcion,
                    codigo: codigo,
                    cantidad: cantidad
                  };
                  productosDelCarrito.push(newProduct);
                } else {
                  productoYaExiste.cantidad = cantidad;
                  productosDelCarrito.splice(indiceProducto, 1, productoYaExiste);
                }
                carritoActualizado = {
                  id: carritoSeleccionado.id,
                  products: productosDelCarrito
                };
                arrayCarrito.splice(indiceCarrito, 1, carritoActualizado);
                newData = JSON.stringify(arrayCarrito, null, "\t");
                _context4.next = 24;
                return fs.writeFile(filePath, newData);
              case 24:
                return _context4.abrupt("return", productosDelCarrito);
              case 25:
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
        var carrito, arrayCarrito, indice, newData;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return fs.readFile(filePath, 'utf8');
              case 2:
                carrito = _context5.sent;
                arrayCarrito = JSON.parse(carrito);
                indice = arrayCarrito.findIndex(function (prod) {
                  return prod.id == id;
                });
                arrayCarrito.splice(indice, 1);
                newData = JSON.stringify(arrayCarrito, null, "\t");
                _context5.next = 9;
                return fs.writeFile(filePath, newData);
              case 9:
                return _context5.abrupt("return", "eliminando el carrito con el id: ".concat(id));
              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
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
        var carrito, arrayCarrito, indiceCarrito, carritoSeleccionado, productosDelCarrito, productoIndice, carritoActualizado, newData;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return fs.readFile(filePath, 'utf8');
              case 2:
                carrito = _context6.sent;
                arrayCarrito = JSON.parse(carrito);
                indiceCarrito = arrayCarrito.findIndex(function (prod) {
                  return prod.id == idCarrito;
                });
                carritoSeleccionado = arrayCarrito[indiceCarrito];
                productosDelCarrito = carritoSeleccionado.products;
                productoIndice = productosDelCarrito.findIndex(function (prod) {
                  return prod.id == idProducto;
                });
                productosDelCarrito.splice(productoIndice, 1);
                carritoActualizado = {
                  id: carritoSeleccionado.id,
                  products: productosDelCarrito
                };
                arrayCarrito.splice(indiceCarrito, 1, carritoActualizado);
                newData = JSON.stringify(arrayCarrito, null, "\t");
                _context6.next = 14;
                return fs.writeFile(filePath, newData);
              case 14:
                return _context6.abrupt("return", "se elimino el producto con el id ".concat(idProducto, " del carrito con el id ").concat(idCarrito));
              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));
      function deleteProductoById(_x6, _x7) {
        return _deleteProductoById.apply(this, arguments);
      }
      return deleteProductoById;
    }()
  }]);
  return CarritoAPI;
}();
var instanciaCarritoApi = new CarritoAPI(filePath);
module.exports = {
  carritoController: instanciaCarritoApi
};