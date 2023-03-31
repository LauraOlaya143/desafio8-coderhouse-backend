"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _server = require("../services/server.js");
var _productos = require("../persistence/daos/mongodb/schemas/productos.js");
var _carrito = require("../persistence/daos/mongodb/schemas/carrito.js");
var _mensajes = require("../persistence/daos/mongodb/schemas/mensajes.js");
var _supertest = _interopRequireDefault(require("supertest"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
jest.setTimeout(80000);
describe("Test de la ruta Productos", function () {
  it("probar metodo getAll", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _supertest["default"])(_server.myServer).get("/api/productos");
          case 2:
            response = _context.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toHaveLength(3);
            expect(response.body.data).toBeInstanceOf(Array);
          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("probar metodo getById", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var id, response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = "6387619904a1cb77f4711482";
            _context2.next = 3;
            return (0, _supertest["default"])(_server.myServer).get("/api/productos/".concat(id));
          case 3:
            response = _context2.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.data.id).toBe(id);
          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("Probar metodo newProducto", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var data, response, controller;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = {
              title: 'Barbie',
              price: '15',
              thumbnail: "https://m.media-amazon.com/images/I/61wU8TmQesL.jpg",
              descripcion: "Muñeca barbie por su cumpleaños",
              stock: "100"
            };
            _context3.next = 3;
            return (0, _supertest["default"])(_server.myServer).post("/api/productos").send(data);
          case 3:
            response = _context3.sent;
            _context3.next = 6;
            return _productos.ProductsModel.findByIdAndDelete(response.body.data.id);
          case 6:
            controller = _context3.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.data.title).toBe(data.title);
            expect(response.body.data.price).toBe(Math.floor(data.price));
          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it("Probar metodo editarProducto", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var data, responseCreate, dataUpdate, response, controller;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = {
              title: 'Barbie',
              price: '15',
              thumbnail: "https://m.media-amazon.com/images/I/61wU8TmQesL.jpg",
              timestamp: "22-02-2023 16:04:52",
              descripcion: "Muñeca barbie por su cumpleaños",
              codigo: "8987e053-53fa-4f02-a1e7-90560af7ca3e",
              stock: "100"
            };
            _context4.next = 3;
            return _productos.ProductsModel.create(data);
          case 3:
            responseCreate = _context4.sent;
            dataUpdate = {
              title: 'Barbie',
              price: '25',
              thumbnail: "https://m.media-amazon.com/images/I/61wU8TmQesL.jpg",
              descripcion: "Muñeca barbie por su cumpleaños",
              stock: "50"
            };
            _context4.next = 7;
            return (0, _supertest["default"])(_server.myServer).put("/api/productos/".concat(responseCreate._id)).send(dataUpdate);
          case 7:
            response = _context4.sent;
            _context4.next = 10;
            return _productos.ProductsModel.findByIdAndDelete(responseCreate._id);
          case 10:
            controller = _context4.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.data.stock).toBe(Math.floor(dataUpdate.stock));
            expect(response.body.data.price).toBe(Math.floor(dataUpdate.price));
          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it("Probar metodo eliminarProducto", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var data, responseCreate, response;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            data = {
              title: 'Barbie2',
              price: '15',
              thumbnail: "https://m.media-amazon.com/images/I/61wU8TmQesL.jpg",
              timestamp: "22-02-2023 16:04:52",
              descripcion: "Muñeca barbie por su cumpleaños",
              codigo: "8987e053-53fa-4f02-a1e7-90560af7ca3e",
              stock: "100"
            };
            _context5.next = 3;
            return _productos.ProductsModel.create(data);
          case 3:
            responseCreate = _context5.sent;
            _context5.next = 6;
            return (0, _supertest["default"])(_server.app)["delete"]("/api/productos/".concat(responseCreate._id));
          case 6:
            response = _context5.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toEqual(expect.stringContaining("".concat(responseCreate._id)));
          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
});
describe("Test de la ruta Carritos", function () {
  it("probar metodo getCarritoById", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var response;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _supertest["default"])(_server.myServer).get("/api/carrito/63e2d790786c647c6e8889f4/productos");
          case 2:
            response = _context6.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toHaveLength(1);
            expect(response.body.data).toBeInstanceOf(Array);
          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it("Probar metodo newCar", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var data, response, controller;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            data = [];
            _context7.next = 3;
            return (0, _supertest["default"])(_server.myServer).post("/api/carrito").send(data);
          case 3:
            response = _context7.sent;
            _context7.next = 6;
            return _carrito.CarritoModel.findByIdAndDelete(response.body.msg.id);
          case 6:
            controller = _context7.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.msg.productos).toStrictEqual(data);
          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it("Probar metodo eliminarCarrito", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var array, responseCreate, stringEsperado, response;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            array = [];
            _context8.next = 3;
            return _carrito.CarritoModel.create({
              products: array
            });
          case 3:
            responseCreate = _context8.sent;
            stringEsperado = "eliminando el carrito con el id: ".concat(responseCreate._id);
            _context8.next = 7;
            return (0, _supertest["default"])(_server.app)["delete"]("/api/carrito/".concat(responseCreate._id));
          case 7:
            response = _context8.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toBe(stringEsperado);
          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it("Probar metodo guardarProductoEnCarrito", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var array, idProducto, responseCreate, response, controller;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            array = [];
            idProducto = "6387619904a1cb77f4711482";
            _context9.next = 4;
            return _carrito.CarritoModel.create({
              products: array
            });
          case 4:
            responseCreate = _context9.sent;
            _context9.next = 7;
            return (0, _supertest["default"])(_server.app).post("/api/carrito/".concat(responseCreate._id, "/productos/").concat(idProducto)).send(array);
          case 7:
            response = _context9.sent;
            _context9.next = 10;
            return _carrito.CarritoModel.findByIdAndDelete(responseCreate._id);
          case 10:
            controller = _context9.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toEqual(expect.stringContaining("".concat(responseCreate._id)));
            expect(response.body.msg[0].id).toBe(idProducto);
          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it("Probar metodo eliminarProductoDelCarrito", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    var array, idProducto1, idProducto2, responseCreate, producto1, producto2, arrayProductos, carritoUpdated, response, controller;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            array = [];
            idProducto1 = "6387619904a1cb77f4711482";
            idProducto2 = "6387619904a1cb77f4711484";
            _context10.next = 5;
            return _carrito.CarritoModel.create({
              products: array
            });
          case 5:
            responseCreate = _context10.sent;
            _context10.next = 8;
            return _productos.ProductsModel.findById(idProducto1);
          case 8:
            producto1 = _context10.sent;
            _context10.next = 11;
            return _productos.ProductsModel.findById(idProducto2);
          case 11:
            producto2 = _context10.sent;
            arrayProductos = [producto1, producto2];
            _context10.next = 15;
            return _carrito.CarritoModel.findByIdAndUpdate(responseCreate._id, {
              products: arrayProductos
            }, {
              "new": true
            });
          case 15:
            carritoUpdated = _context10.sent;
            _context10.next = 18;
            return (0, _supertest["default"])(_server.app)["delete"]("/api/carrito/".concat(responseCreate._id, "/productos/").concat(idProducto2));
          case 18:
            response = _context10.sent;
            _context10.next = 21;
            return _carrito.CarritoModel.findByIdAndDelete(responseCreate._id);
          case 21:
            controller = _context10.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toEqual(expect.stringContaining("".concat(responseCreate._id)));
            expect(response.body.msg).toEqual(expect.stringContaining("".concat(idProducto2)));
          case 25:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
});
describe("Test de la ruta ProductosRandom", function () {
  it("probar metodo getProductosRandoms", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    var response;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return (0, _supertest["default"])(_server.myServer).get("/api/productos-test");
          case 2:
            response = _context11.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toHaveLength(5);
            expect(response.body.data).toBeInstanceOf(Array);
          case 6:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
});
describe("Test de la ruta mensajes", function () {
  it("probar metodo getAllMensajes", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
    var response;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return (0, _supertest["default"])(_server.myServer).get("/mensajes");
          case 2:
            response = _context12.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toBeInstanceOf(Array);
          case 5:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  it("Probar metodo saveNewMessage", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
    var objetoUsuario, response, controller;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            objetoUsuario = {
              username: "lau14",
              email: "laura14@gmail.com",
              direccion: "mila4",
              foto: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bc2642ea-5bf4-4c5f-8710-f464bc4c06d3/dex6jku-af7fc050-698b-4a42-a685-2113397a3ac2.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JjMjY0MmVhLTViZjQtNGM1Zi04NzEwLWY0NjRiYzRjMDZkM1wvZGV4NmprdS1hZjdmYzA1MC02OThiLTRhNDItYTY4NS0yMTEzMzk3YTNhYzIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.QtEgEZAy4d6M7YpHyZZ4K_qqFIyzpgTAZdipbNFjwac",
              text: "Hola! soy una prueba!"
            };
            _context13.next = 3;
            return (0, _supertest["default"])(_server.myServer).post("/mensajes").send(objetoUsuario);
          case 3:
            response = _context13.sent;
            _context13.next = 6;
            return _mensajes.MensajesModel.findByIdAndDelete(response.body.data._id);
          case 6:
            controller = _context13.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toBeInstanceOf(Object);
            expect(response.body.data.author.username).toBe(objetoUsuario.username);
            expect(response.body.data.text).toBe(objetoUsuario.text);
          case 11:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  })));
});