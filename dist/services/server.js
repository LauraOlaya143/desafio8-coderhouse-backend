"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myServer = exports.app = void 0;
var _express = _interopRequireWildcard(require("express"));
var _http = _interopRequireDefault(require("http"));
var _socket = require("./socket");
var _path = _interopRequireDefault(require("path"));
var _expressHandlebars = require("express-handlebars");
var _morgan = _interopRequireDefault(require("morgan"));
var _faker = require("@faker-js/faker");
var _moment = _interopRequireDefault(require("moment"));
var _uuid = require("uuid");
var _index = _interopRequireDefault(require("../routes/index"));
var _productosService = require("./rest/productosService.js");
var _productosTestService = require("./rest/productos-testService");
var _mensajesService = require("./rest/mensajesService.js");
var _normalizado = require("../utils/normalizado.js");
var _compression = _interopRequireDefault(require("compression"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _cors = _interopRequireDefault(require("cors"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _passport = _interopRequireDefault(require("passport"));
var _auth = require("../controller/auth.js");
var _logger = _interopRequireDefault(require("../utils/logger.js"));
var _logger2 = _interopRequireDefault(require("../middlewares/logger.js"));
var _expressGraphql = require("express-graphql");
var _ServiceGraphql = require("./graphql/ServiceGraphql.js");
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _info = require("../docs/info.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//usar Faker

_faker.faker.locale = "es";

// rutas de las vistas con HBS

var viewsFolderPath = _path["default"].resolve(__dirname, '../../views');
var layoutsFolderPath = "".concat(viewsFolderPath, "/layouts");
var layoutPorDefecto = "".concat(layoutsFolderPath, "/index.hbs");
var partialsFolderPath = "".concat(viewsFolderPath, "/partials");
var app = (0, _express["default"])();
exports.app = app;
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"]("public"));
app.use((0, _morgan["default"])("dev"));
app.use((0, _compression["default"])());

/* Views creadas con hbs:*/

app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);
app.engine('hbs', (0, _expressHandlebars.engine)({
  layoutsDir: layoutsFolderPath,
  extname: "hbs",
  defaultLayout: layoutPorDefecto,
  partialsDir: partialsFolderPath
}));

//cookies y session con passport

var mySecret = "mySecret";
app.use((0, _cookieParser["default"])(mySecret));
var ttlSeconds = 180;
var connection = process.env.MONGO_ATLAS || "mongodb://localhost:27017/coderhouse";
var StoreOptions = {
  store: _connectMongo["default"].create({
    mongoUrl: connection,
    crypto: {
      secret: '1234'
    }
  }),
  secret: 'secretString',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000
  }
};
app.use((0, _expressSession["default"])(StoreOptions));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
_passport["default"].use("login", _auth.loginFunc);
_passport["default"].use("signup", _auth.signUpFunc);
var users = [{
  username: 'juan',
  password: '1234',
  admin: true
}, {
  username: 'jose',
  password: '123456',
  admin: false
}];

//GraphQL

app.use("/graphql", (0, _expressGraphql.graphqlHTTP)({
  schema: _ServiceGraphql.graphqlSchema,
  rootValue: _ServiceGraphql.graphqlRoot,
  graphiql: true
}));

//documentacion de api

var specs = (0, _swaggerJsdoc["default"])(_info.infoDocs);
app.use("/docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(specs));

//Que todos los dominios puedan:

app.use((0, _cors["default"])());

//pagina principal

app.get("/", _logger2["default"], /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var data, cantidadObjetos, validarArray, user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _productosService.ProductosController.getAll();
          case 2:
            data = _context.sent;
            cantidadObjetos = data.length;
            validarArray = cantidadObjetos > 0 ? true : false;
            user = req.cookies.username;
            _logger["default"].info(user);
            res.render("main", {
              nombre: user,
              productos: data,
              cantidad: validarArray
            });
          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

//Login y logout (con persistencia local)

// app.post("/login",info, async (req, res) => {
//     const { username, password } = req.body;

//     const index = users.findIndex((user) => user.username === username && user.password === password)

//     logger.info(index);

//     const data = await ProductosController.getAll()
//     const cantidadObjetos = data.length
//     const validarArray = cantidadObjetos > 0 ? true : false

//     let respuesta = []

//     for (let i = 0; i < data.length; i++) {
//         respuesta.push({
//             id: data[i]._id,
//             title: data[i].title,
//             price: data[i].price,
//             thumbnail: data[i].thumbnail,
//             timestamp: data[i].timestamp,
//             descripcion: data[i].descripcion,
//             codigo: data[i].codigo,
//             stock: data[i].stock
//         })

//     }

//     if(index < 0) {
//         logger.error("No estas autorizado")
//         res.status(401).json({msg: "No estas autorizado :c"});
//     } else {
//         const user = users[index];
//         req.session.info = {
//             username: user.username,
//             loggedIn: true,
//             contador: 1,
//             admin: user.admin,
//         }

//         res.render("main", { nombre: user.username, productos: respuesta, cantidad: validarArray})
//     }
// })

// app.post("/login-json",info, async (req, res) => {
//     const { username, password } = req.body;

//     const index = users.findIndex((user) => user.username === username && user.password === password)

//     logger.info(index);

//     if(index < 0) {
//         res.status(401).json({msg: "No estas autorizado :c"});
//     } else {
//         const user = users[index];
//         req.session.info = {
//             username: user.username,
//             loggedIn: true,
//             contador: 1,
//             admin: user.admin,
//         }

//         res.json({msg: `Bienvenido ${user.username}`})
//     }
// })

//Login front con passport

app.get("/login", _logger2["default"], function (req, res) {
  res.render("loginHbs");
});
app.post('/logout', _logger2["default"], function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    var cookies = req.cookies;
    _logger["default"].info(cookies);
    res.clearCookie("username");
    res.redirect('/login');
  });
});

//logout como prueba en Postman

app.post('/logout-json', _logger2["default"], function (req, res) {
  req.session.destroy();
  res.json({
    msg: "Session destruida"
  });
});

//Usando la informacion del objeto REQ

app.get("/infoRoot", _logger2["default"], function (req, res) {
  var ruta = req.url;
  var metodo = req.method;
  res.json({
    ruta: ruta,
    metodo: metodo
  });
});

//Front de pagina de productos y formulario

app.get("/productos", _logger2["default"], /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var data, cantidadObjetos, validarArray;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _productosService.ProductosController.getAll();
          case 2:
            data = _context2.sent;
            cantidadObjetos = data.length;
            validarArray = cantidadObjetos > 0 ? true : false;
            res.render("showProducts", {
              productos: data,
              cantidad: validarArray
            });
          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.get("/productos-test", _logger2["default"], /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var respuesta, cantidadObjetos, validarArray;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _productosTestService.productosRandoms)();
          case 2:
            respuesta = _context3.sent;
            cantidadObjetos = respuesta.length;
            validarArray = cantidadObjetos > 0 ? true : false;
            res.render("showProducts", {
              productos: respuesta,
              cantidad: validarArray
            });
          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.get("/formulario", _logger2["default"], function (req, res) {
  res.render("formularioHbs");
});

//Mensajes guardados en Mongo

app.get("/mensajes", _logger2["default"], /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var controller, status, message;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _mensajesService.messageController.getAll();
          case 3:
            controller = _context4.sent;
            res.json({
              data: controller
            });
            _context4.next = 13;
            break;
          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            status = _context4.t0.status || 500;
            message = _context4.t0.message || "internal server error";
            _logger["default"].error(message);
            res.status(status).json({
              message: message
            });
          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
app.post("/mensajes", _logger2["default"], /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body, username, email, direccion, foto, text, objetoUsuario, newMensaje, controller, status, message;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body = req.body, username = _req$body.username, email = _req$body.email, direccion = _req$body.direccion, foto = _req$body.foto, text = _req$body.text;
            objetoUsuario = {
              username: username,
              email: email,
              direccion: direccion,
              foto: foto
            };
            newMensaje = {
              author: objetoUsuario,
              text: text,
              time: (0, _moment["default"])().format("DD-MM-YYYY HH:MM:SS")
            };
            _context5.next = 6;
            return _mensajesService.messageController.saveNewMessage(newMensaje);
          case 6:
            controller = _context5.sent;
            res.json({
              data: controller
            });
            _context5.next = 16;
            break;
          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            status = _context5.t0.status || 500;
            message = _context5.t0.message || "internal server error";
            _logger["default"].error(message);
            res.status(status).json({
              message: message
            });
          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

//Normalizacion y desnormalizacion de mensajes

app.get("/mensajes-normalizados", _logger2["default"], /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var data, status, message;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _normalizado.normalizado)();
          case 3:
            data = _context6.sent;
            res.json({
              data: data
            });
            _context6.next = 13;
            break;
          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            status = _context6.t0.status || 500;
            message = _context6.t0.message || "internal server error";
            _logger["default"].error(message);
            res.status(status).json({
              message: message
            });
          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
app.get("/mensajes-desnormalizados", _logger2["default"], /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var data, status, message;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return (0, _normalizado.desnormalizar)();
          case 3:
            data = _context7.sent;
            res.json({
              data: data
            });
            _context7.next = 13;
            break;
          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            status = _context7.t0.status || 500;
            message = _context7.t0.message || "internal server error";
            _logger["default"].error(message);
            res.status(status).json({
              message: message
            });
          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());

//Informacion usando el objeto process

app.get("/info", _logger2["default"], function (req, res) {
  var directorio = process.cwd();
  var idProcesoActual = process.pid;
  var versionNode = process.version;
  var nombreProceso = process.title;
  var sistemaOperativo = process.platform;
  var memory = JSON.stringify(process.memoryUsage());
  res.json({
    msg: "datos...",
    directorio: directorio,
    idProcesoActual: idProcesoActual,
    versionNode: versionNode,
    nombreProceso: nombreProceso,
    sistemaOperativo: sistemaOperativo,
    memoriaTotal: memory
  });
});

//Prueba de que la pagina no se congela

app.get('/slow', _logger2["default"], function (req, res) {
  _logger["default"].info("PID= ".concat(process.pid));
  var sum = 0;
  for (var i = 0; i < 15006500445; i++) {
    sum += i;
  }
  res.json({
    pid: process.pid,
    sum: sum
  });
});
app.use("/api", _index["default"]);
app.use(function (err, req, res, next) {
  var status = err.status || 500;
  var message = err.message || "internal server error";
  _logger["default"].error(err.stack);
  res.status(status).json({
    message: message
  });
});

//Control de mensajes para rutas no existentes

app.get('/*', _logger2["default"], function (req, res) {
  _logger["default"].info("Ruta no encontrada :c");
  res.json({
    msg: "Esta ruta no existe :c"
  });
});
var myServer = _http["default"].Server(app);
exports.myServer = myServer;
(0, _socket.initWsServer)(myServer);