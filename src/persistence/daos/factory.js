import ClientMongoProductos from "./mongodb/productosMongo.js"
import ClientMongoCarritos from "./mongodb/carritoMongo.js"
import ClientMongoMensajes from "./mongodb/mensajesMongo.js"
import ClientMongoUsuarios from "./mongodb/userMongo.js"
import {initConnection} from "./mongodb/db/database.js"
//sql
import sqlController from "./SQL/BDproductos.js"
//fileSystem

import ClientProductosFS from "./FS/productosFs.js"
import ClientCarritosFS from "./FS/carritoFs.js"
import ClientMensajesFS from "./FS/mensajesFs.js"

import logger from "../../utils/logger.js"


let daoProductos;
let daoCarrito;
let daoMensajes;
let daoUsers;
let argv = process.argv[2]

//Parametro para test
// let argv = "test";

//parametro para usar FS

// let argv = "fs"

const init = async () => {
    await initConnection();
}

switch (argv) {
    case "mongo":
        logger.info("Se eligio mongo")
        daoProductos = new ClientMongoProductos;
        daoCarrito = new ClientMongoCarritos;
        daoMensajes = new ClientMongoMensajes;
        daoUsers = new ClientMongoUsuarios;
        break;
    case "sql":
        logger.info(`Se eligio SQL a partir de los comandos: ${argv}`)
        daoProductos = new ClientMongoProductos;
        daoCarrito = new ClientMongoCarritos;
        daoMensajes = new ClientMongoMensajes;
        daoUsers = new ClientMongoUsuarios;
        break;
    case "test":
        logger.info("Se eligio test")
        init();
        daoProductos = new ClientMongoProductos;
        daoCarrito = new ClientMongoCarritos;
        daoMensajes = new ClientMongoMensajes;
        daoUsers = new ClientMongoUsuarios;
        break
    case "fs":
        logger.info("se eligio FS")
        daoProductos = new ClientProductosFS;
        daoCarrito = new ClientCarritosFS;
        daoMensajes = new ClientMensajesFS;
        daoUsers = new ClientMongoUsuarios;
        break;
    default:
        logger.info("Por defecto se dejo Mongo")
        daoProductos = new ClientMongoProductos;
        daoCarrito = new ClientMongoCarritos;
        daoMensajes = new ClientMongoMensajes;
        daoUsers = new ClientMongoUsuarios;
        break;
}

export function getPersistence () {
    return argv
}

export function getDaoProductos() {
    return daoProductos;
}

export function getDaoCar() {
    return daoCarrito;
}

export function getDaoMensajes() {
    return daoMensajes;
}

export function getDaoUser() {
    return daoUsers;
}