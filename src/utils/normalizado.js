import fs from 'fs';
import path from 'path';
import {MongoMensajesController} from "../persistence/daos/mongodb/mensajesMongo.js"
import { normalize, schema, denormalize  } from 'normalizr';

const filePath = path.resolve(__dirname, '../../data/mensajes.json');
const normalizedDataPath = path.resolve(__dirname, "../../data/mensajesNormalizados.json")

const user = new schema.Entity("users", {}, {
    idAttribute: "email"
});

const msg = new schema.Entity("mensajes", {
    author: user
},{idAttribute: "id"})

const finalSchema = [msg];

const normalizado = async () => {
    const data1 = await fs.promises.readFile(filePath, 'utf-8')
    const data = JSON.parse(data1);

    const normalizeData = normalize(data, finalSchema)

    let contenido = JSON.stringify(normalizeData, null, "\t");

    const controller = await fs.promises.writeFile(normalizedDataPath, contenido)

    return normalizeData
}

const desnormalizar = async () => {
    const normalizedData1 = await fs.promises.readFile(normalizedDataPath, 'utf-8')
    const normalizedData = JSON.parse(normalizedData1);

    const denormalizedData = denormalize( normalizedData.result, finalSchema, normalizedData.entities);

    return denormalizedData
}

export { normalizado, desnormalizar }