import mongoose from "mongoose";

const mensajesCollectionName = "mensajes"

const mensajesSchema = new mongoose.Schema({
    author: {type: Object},
    text: {type: String, required: true},
})

const MensajesModel = mongoose.model(mensajesCollectionName, mensajesSchema)


export {
    mensajesCollectionName,
    MensajesModel
}