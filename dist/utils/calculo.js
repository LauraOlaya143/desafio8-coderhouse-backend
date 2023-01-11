"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculo = void 0;
var random = function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
var calculo = function calculo(cantidad) {
  var array = [];
  var repetidos = {};
  for (var i = 1; i <= cantidad; i++) {
    var newNumber = random(1, 1001);
    array.push(newNumber);
  }
  array.forEach(function (numero) {
    repetidos[numero] = (repetidos[numero] || 0) + 1;
  });
  return repetidos;
};
exports.calculo = calculo;
process.on('message', function (msg) {
  if (msg == 'inicio') {
    console.log(process.argv[2]);
    var numero;
    if (isNaN(process.argv[2])) {
      numero = 100000000;
    } else {
      var number = parseFloat(process.argv[2]);
      numero = number;
    }
    console.log(numero);
    console.log("Start calculo, PID: ".concat(process.pid));
    var sum = calculo(numero);
    process.send(sum);
  }
});