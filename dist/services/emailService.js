"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transporter = exports.emailOptions = void 0;
var _nodemailer = require("nodemailer");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var transporter = (0, _nodemailer.createTransport)({
  host: 'smtp.gmail.com',
  port: process.env.PORT_GMAIL,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});
exports.transporter = transporter;
var emailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
  subject: "Primer envio de email",
  html: "<h1>Hola! este es el mensaje del email con html</h1>",
  attachments: [{
    path: process.cwd() + "/src/services/texto.txt",
    filename: "texto-adjunto"
  }]
};
exports.emailOptions = emailOptions;