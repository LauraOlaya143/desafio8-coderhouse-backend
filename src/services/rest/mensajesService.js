import createError from "http-errors"
import fs from "fs/promises"
import path from "path"
import { sqlite } from "../../persistence/daos/SQL/BDmensajes.js"
// import {MongoMensajesController} from "../../persistence/daos/mongodb/mensajesMongo.js"
import MensajesReposity from "../../persistence/repository/mensajesRepository.js";

const mensajesRepository = new MensajesReposity();

const filePath = path.resolve(__dirname, '../../../data/mensajes.json');

class ProductosAPI {
    constructor(archivo) {
        this.archivo = archivo;
    }
    async crearBD(){
        const mensajes = await fs.readFile(filePath, 'utf8');
        const arrayMensajes = JSON.parse(mensajes)
        await sqlite.createTable();
        await sqlite.insertMessage(arrayMensajes)
    }

    async getAll(){
        // const mensajes = await MongoMensajesController.getAllMensajes()
        const mensajes = await mensajesRepository.getAll();
        return mensajes
    }
    
    async saveNewMessage(message) {
        // const newMensaje = await MongoMensajesController.createMensaje(message)
        const newMensaje = await mensajesRepository.saveMessage(message);
        // const mensajes = await MongoMensajesController.getAllMensajes()
        const mensajes = await mensajesRepository.getAll();
        const newData = JSON.stringify(mensajes, null, "\t")

        await fs.writeFile(filePath, newData)

        return newMensaje

        }
}

export const getAllMessages = async() => {
    const mensajes = await mensajesRepository.getAll()
    return mensajes
}

export const saveNewMessage = async(message) => {
    const newMensaje = await mensajesRepository.saveMessage(message);
    const mensajes = await mensajesRepository.getAll();
    const newData = JSON.stringify(mensajes, null, "\t")

    return newMensaje
}

const messageController = new ProductosAPI(filePath);

export {
    messageController
}