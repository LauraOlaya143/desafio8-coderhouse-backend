"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoDocs = void 0;
var infoDocs = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Proyecto coder api",
      description: "Ecommerce Backend",
      version: "1.0.0"
    },
    servers: [{
      url: "http://localhost:8080"
    }
    // {
    //     url: "http://railway.app/myapp"
    // }
    ]
  },

  apis: ["./src/docs/*.yml"]
};
exports.infoDocs = infoDocs;