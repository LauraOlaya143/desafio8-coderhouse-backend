"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductById = exports.getAllProducts = exports.eliminarStock = exports.eliminarProducto = exports.editarProducto = exports.crearProducto = exports.ProductosController = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _promises = _interopRequireDefault(require("fs/promises"));
var _path = _interopRequireDefault(require("path"));
var _moment = _interopRequireDefault(require("moment"));
var _uuid = require("uuid");
var _BDproductos = require("../../persistence/daos/SQL/BDproductos.js");
var _productosMongo = require("../../persistence/daos/mongodb/productosMongo.js");
var _productosRepository = _interopRequireDefault(require("../../persistence/repository/productosRepository.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var productsRepository = new _productosRepository["default"]();
var filePath = _path["default"].resolve(__dirname, '../../productos.json');
var ProductosAPI = /*#__PURE__*/function () {
  function ProductosAPI(archivo) {
    _classCallCheck(this, ProductosAPI);
    this.archivo = archivo;
  }
  _createClass(ProductosAPI, [{
    key: "crearBD",
    value: function () {
      var _crearBD = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var productos, arrayProductos;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _promises["default"].readFile(filePath, 'utf8');
              case 2:
                productos = _context.sent;
                arrayProductos = JSON.parse(productos);
                _context.next = 6;
                return _BDproductos.sql.createTable();
              case 6:
                _context.next = 8;
                return _BDproductos.sql.insertProduct(arrayProductos);
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function crearBD() {
        return _crearBD.apply(this, arguments);
      }
      return crearBD;
    }()
  }, {
    key: "exists",
    value: function () {
      var _exists = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id) {
        var productos, indice;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return productsRepository.getAll();
              case 2:
                productos = _context2.sent;
                indice = productos.findIndex(function (prod) {
                  return prod.id == id;
                });
                return _context2.abrupt("return", indice >= 0);
              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      function exists(_x) {
        return _exists.apply(this, arguments);
      }
      return exists;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var productos;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return productsRepository.getAll();
              case 2:
                productos = _context3.sent;
                return _context3.abrupt("return", productos);
              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      function getAll() {
        return _getAll.apply(this, arguments);
      }
      return getAll;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id) {
        var existe, indice;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.exists(id);
              case 2:
                existe = _context4.sent;
                if (existe) {
                  _context4.next = 5;
                  break;
                }
                throw (0, _httpErrors["default"])(404, 'producto no encontrado :c');
              case 5:
                _context4.next = 7;
                return productsRepository.getById(id);
              case 7:
                indice = _context4.sent;
                return _context4.abrupt("return", indice);
              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function getById(_x2) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
  }, {
    key: "saveNewProduct",
    value: function () {
      var _saveNewProduct = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(newProduct) {
        var title, price, thumbnail, descripcion, stock, time, newCodigo, product, controller;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                title = newProduct.title, price = newProduct.price, thumbnail = newProduct.thumbnail, descripcion = newProduct.descripcion, stock = newProduct.stock;
                time = (0, _moment["default"])().format("DD-MM-YYYY HH:MM:SS");
                newCodigo = (0, _uuid.v4)();
                product = {
                  title: title,
                  price: price,
                  thumbnail: thumbnail,
                  timestamp: time,
                  descripcion: descripcion,
                  codigo: newCodigo,
                  stock: stock
                };
                _context5.next = 6;
                return productsRepository.saveProduct(product);
              case 6:
                controller = _context5.sent;
                return _context5.abrupt("return", controller);
              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
      function saveNewProduct(_x3) {
        return _saveNewProduct.apply(this, arguments);
      }
      return saveNewProduct;
    }()
  }, {
    key: "updateById",
    value: function () {
      var _updateById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id, newProduct) {
        var existe, product, title, price, thumbnail, descripcion, stock, timestamp, codigo, productoActualizado, controller;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.exists(id);
              case 2:
                existe = _context6.sent;
                if (existe) {
                  _context6.next = 5;
                  break;
                }
                throw (0, _httpErrors["default"])(404, 'producto no encontrado :c');
              case 5:
                _context6.next = 7;
                return productsRepository.getById(id);
              case 7:
                product = _context6.sent;
                title = newProduct.title, price = newProduct.price, thumbnail = newProduct.thumbnail, descripcion = newProduct.descripcion, stock = newProduct.stock;
                timestamp = product.timestamp, codigo = product.codigo;
                productoActualizado = {
                  title: title,
                  price: price,
                  thumbnail: thumbnail,
                  timestamp: timestamp,
                  descripcion: descripcion,
                  codigo: codigo,
                  stock: stock
                };
                _context6.next = 13;
                return productsRepository.updateProduct(id, productoActualizado);
              case 13:
                controller = _context6.sent;
                return _context6.abrupt("return", controller);
              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function updateById(_x4, _x5) {
        return _updateById.apply(this, arguments);
      }
      return updateById;
    }()
  }, {
    key: "deleteById",
    value: function () {
      var _deleteById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id) {
        var existe, controller;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.exists(id);
              case 2:
                existe = _context7.sent;
                if (existe) {
                  _context7.next = 5;
                  break;
                }
                throw (0, _httpErrors["default"])(404, 'producto no encontrado :c');
              case 5:
                _context7.next = 7;
                return productsRepository.deleteProduct(id);
              case 7:
                controller = _context7.sent;
                return _context7.abrupt("return", "eliminando el producto con el id: ".concat(id));
              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function deleteById(_x6) {
        return _deleteById.apply(this, arguments);
      }
      return deleteById;
    }()
  }, {
    key: "eliminarStock",
    value: function () {
      var _eliminarStock = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(idProducto) {
        var existe, producto, title, price, thumbnail, timestamp, descripcion, codigo, stock, newStock, productoActualizado, controller;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.exists(idProducto);
              case 2:
                existe = _context8.sent;
                if (existe) {
                  _context8.next = 5;
                  break;
                }
                throw (0, _httpErrors["default"])(404, 'producto no encontrado');
              case 5:
                _context8.next = 7;
                return productsRepository.getById(idProducto);
              case 7:
                producto = _context8.sent;
                title = producto.title, price = producto.price, thumbnail = producto.thumbnail, timestamp = producto.timestamp, descripcion = producto.descripcion, codigo = producto.codigo, stock = producto.stock;
                newStock = stock - 1;
                if (!(newStock <= 0)) {
                  _context8.next = 12;
                  break;
                }
                return _context8.abrupt("return", "No hay estock disponible :c");
              case 12:
                productoActualizado = {
                  title: title,
                  price: price,
                  thumbnail: thumbnail,
                  timestamp: timestamp,
                  descripcion: descripcion,
                  codigo: codigo,
                  stock: newStock
                };
                _context8.next = 15;
                return productsRepository.updateProduct(idProducto, productoActualizado);
              case 15:
                controller = _context8.sent;
                return _context8.abrupt("return", "stock eliminado");
              case 17:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function eliminarStock(_x7) {
        return _eliminarStock.apply(this, arguments);
      }
      return eliminarStock;
    }()
  }]);
  return ProductosAPI;
}(); //funciones graphql
var crearProducto = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(obj) {
    var title, price, thumbnail, descripcion, stock, time, newCodigo, product, controller;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            title = obj.title, price = obj.price, thumbnail = obj.thumbnail, descripcion = obj.descripcion, stock = obj.stock;
            time = (0, _moment["default"])().format("DD-MM-YYYY HH:MM:SS");
            newCodigo = (0, _uuid.v4)();
            product = {
              title: title,
              price: price,
              thumbnail: thumbnail,
              timestamp: time,
              descripcion: descripcion,
              codigo: newCodigo,
              stock: stock
            };
            _context9.next = 6;
            return productsRepository.saveProduct(product);
          case 6:
            controller = _context9.sent;
            return _context9.abrupt("return", controller);
          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return function crearProducto(_x8) {
    return _ref.apply(this, arguments);
  };
}();
exports.crearProducto = crearProducto;
var getAllProducts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    var productos;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return productsRepository.getAll();
          case 2:
            productos = _context10.sent;
            return _context10.abrupt("return", productos);
          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return function getAllProducts() {
    return _ref2.apply(this, arguments);
  };
}();
exports.getAllProducts = getAllProducts;
var getProductById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(id) {
    var productos, prueba, existe, indice;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return productsRepository.getAll();
          case 2:
            productos = _context11.sent;
            prueba = productos.findIndex(function (prod) {
              return prod.id == id;
            });
            existe = prueba >= 0;
            if (existe) {
              _context11.next = 7;
              break;
            }
            throw (0, _httpErrors["default"])(404, 'producto no encontrado :c');
          case 7:
            _context11.next = 9;
            return productsRepository.getById(id);
          case 9:
            indice = _context11.sent;
            return _context11.abrupt("return", indice);
          case 11:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return function getProductById(_x9) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getProductById = getProductById;
var editarProducto = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(id, body) {
    var productos, prueba, existe, product, title, price, thumbnail, descripcion, stock, timestamp, codigo, productoActualizado, producto;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return productsRepository.getAll();
          case 2:
            productos = _context12.sent;
            prueba = productos.findIndex(function (prod) {
              return prod.id == id;
            });
            existe = prueba >= 0;
            if (existe) {
              _context12.next = 7;
              break;
            }
            throw (0, _httpErrors["default"])(404, 'producto no encontrado :c');
          case 7:
            _context12.next = 9;
            return _productosMongo.MongoProductosController.getProductById(id);
          case 9:
            product = _context12.sent;
            title = body.title, price = body.price, thumbnail = body.thumbnail, descripcion = body.descripcion, stock = body.stock;
            timestamp = product.timestamp, codigo = product.codigo;
            productoActualizado = {
              title: title,
              price: price,
              thumbnail: thumbnail,
              timestamp: timestamp,
              descripcion: descripcion,
              codigo: codigo,
              stock: stock
            };
            _context12.next = 15;
            return productsRepository.updateProduct(id, productoActualizado);
          case 15:
            producto = _context12.sent;
            return _context12.abrupt("return", producto);
          case 17:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return function editarProducto(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
exports.editarProducto = editarProducto;
var eliminarProducto = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(id) {
    var productos, prueba, existe, controller;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return productsRepository.getAll();
          case 2:
            productos = _context13.sent;
            prueba = productos.findIndex(function (prod) {
              return prod.id == id;
            });
            existe = prueba >= 0;
            if (existe) {
              _context13.next = 7;
              break;
            }
            throw (0, _httpErrors["default"])(404, 'producto no encontrado :c');
          case 7:
            _context13.next = 9;
            return productsRepository.deleteProduct(id);
          case 9:
            controller = _context13.sent;
            return _context13.abrupt("return", "eliminando el producto con el id: ".concat(id));
          case 11:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return function eliminarProducto(_x12) {
    return _ref5.apply(this, arguments);
  };
}();
exports.eliminarProducto = eliminarProducto;
var eliminarStock = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(idProducto) {
    var productos, indice, existe, producto, title, price, thumbnail, timestamp, descripcion, codigo, stock, newStock, productoActualizado, controller;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return productsRepository.getAll();
          case 2:
            productos = _context14.sent;
            indice = productos.findIndex(function (prod) {
              return prod.id == idProducto;
            });
            existe = indice >= 0;
            if (existe) {
              _context14.next = 7;
              break;
            }
            throw (0, _httpErrors["default"])(404, 'producto no encontrado :c');
          case 7:
            _context14.next = 9;
            return productsRepository.getById(idProducto);
          case 9:
            producto = _context14.sent;
            title = producto.title, price = producto.price, thumbnail = producto.thumbnail, timestamp = producto.timestamp, descripcion = producto.descripcion, codigo = producto.codigo, stock = producto.stock;
            newStock = stock - 1;
            productoActualizado = {
              title: title,
              price: price,
              thumbnail: thumbnail,
              timestamp: timestamp,
              descripcion: descripcion,
              codigo: codigo,
              stock: newStock
            };
            _context14.next = 15;
            return productsRepository.updateProduct(idProducto, productoActualizado);
          case 15:
            controller = _context14.sent;
            return _context14.abrupt("return", "stock eliminado");
          case 17:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return function eliminarStock(_x13) {
    return _ref6.apply(this, arguments);
  };
}();
exports.eliminarStock = eliminarStock;
var ProductosController = new ProductosAPI(filePath);
exports.ProductosController = ProductosController;