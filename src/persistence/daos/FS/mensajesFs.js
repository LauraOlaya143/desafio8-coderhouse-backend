import path from "path"
import fs from "fs/promises"

const filePath = path.resolve(__dirname, '../../../../data/mensajes.json');


export default class ClientMensajesFS {
    async getAllMensajes() {
        const mensajes = await fs.readFile(filePath, 'utf8');
        const arrayMensajes = JSON.parse(mensajes) 
        return arrayMensajes
    }

    async createMensaje (object){
        const mensajes = await fs.readFile(filePath, 'utf8');
        const arrayMensajes = JSON.parse(mensajes) 

        arrayMensajes.push(object);

        const newData = JSON.stringify(arrayMensajes, null, "\t")

        await fs.writeFile(filePath, newData)

        return newData
    }
}

const MensajesFSController = new ClientMensajesFS();

export {
    MensajesFSController
}