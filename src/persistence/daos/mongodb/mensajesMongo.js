import {MensajesModel} from "./schemas/mensajes.js"

class ClientMongo {
    async getAllMensajes() {
        const mensajes = await MensajesModel.find();
        return mensajes
    }

    async createMensaje (object){
        const newProduct = await MensajesModel.create(object)
        return newProduct
    }
}

const MongoMensajesController = new ClientMongo();

export {
    MongoMensajesController
}