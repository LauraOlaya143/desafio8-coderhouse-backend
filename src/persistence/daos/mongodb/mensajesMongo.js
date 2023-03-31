import {MensajesModel} from "./schemas/mensajes.js"

export default class ClientMongoMensajes {
    async getAllMensajes() {
        const mensajes = await MensajesModel.find();
        return mensajes
    }

    async createMensaje (object){
        const newProduct = await MensajesModel.create(object)
        return newProduct
    }
}

const MongoMensajesController = new ClientMongoMensajes();

export {
    MongoMensajesController
}