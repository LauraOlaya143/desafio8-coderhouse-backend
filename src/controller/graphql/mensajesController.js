import {getAllMessages, saveNewMessage} from "../../services/rest/mensajesService.js"
import moment from "moment"

export async function getAllMessagesCtr(){
    const data = await getAllMessages()
    return data
}

export async function saveNewMessageCtr({data}) {
    const newObj = { ...data }
    console.log(newObj)

    const objetoUsuario = {
        username: newObj.username, 
        email: newObj.email, 
        direccion: newObj.direccion, 
        foto: newObj.foto,
    }

    const newMensaje = {
        author: objetoUsuario,
        text: newObj.text,
        time: moment().format("DD-MM-YYYY HH:MM:SS"),
    }
    const newMsg = await saveNewMessage(newMensaje);
    return newMsg
}