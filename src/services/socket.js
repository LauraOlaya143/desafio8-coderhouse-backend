import io from "socket.io"
import { messageController } from "./rest/mensajesService.js"
import moment from "moment"
import { ProductosController } from "./rest/productosService.js"
import {getAll} from "../persistence/repository/userRepository.js"
import logger from "../utils/logger.js"

let myWebSocketServer;

const initWsServer = (server) => {
    //creacion del servidor de webSocket usando socket.io
    myWebSocketServer = io(server);

    myWebSocketServer.on("connection", (socket) => {
        logger.info("Se acaba de conectar un cliente!")
    
        //este es el id para enviar cosas del server al cliente
        logger.info(`ID del servidor socket ${socket.id}`)
    
        //este es el id para enviar cosas del cliente al servidor
        logger.info(`ID del cliente socket ${socket.client.id}`)

        socket.on("eventoNuevoProducto", async (dataUsuario) => {
            const dataController = await ProductosController.saveNewProduct(dataUsuario)
            
            myWebSocketServer.emit("crearNuevoProducto", {
                data: dataController
            })
        })
    
        socket.on("eventoTextoUsuario", async (dataUsuario) => {
            logger.info(`el cliente ${socket.client.id} me acaba de enviar el mensaje con el evento eventoTextoUsuario`)

            const usuarios = await getAll();
            const userName = dataUsuario.email
            const indice = usuarios.findIndex(user => user.username == userName);
            const usuario = usuarios[indice]
            logger.info(usuario)
            

            const newMessage = {
                author: usuario,
                text: dataUsuario.text,
                time: moment().format("DD-MM-YYYY HH:MM:SS"),
            }

            logger.info(newMessage)

            const dataController = await messageController.saveNewMessage(newMessage)

            socket.emit("respuestaMensaje", { 
                data: dataUsuario
            })
    
            myWebSocketServer.emit("notifGeneral", {
                mensaje: "LLego un nuevo mensaje",
                data: newMessage
            })
        })
    })

    return myWebSocketServer
}

const getWsServer = () => {
    return myWebSocketServer;
}

export {
    initWsServer,
    getWsServer
}
