import mensajesDTO, { asDto } from '../dto/mensajes-dto.js';
import {getDaoMensajes} from "../daos/factory.js"

export default class MensajesReposity {
    constructor() {
        this.dao = getDaoMensajes();
    }

    async getAll() {
        const mensajes = await this.dao.getAllMensajes();
        const mensajesDTO = asDto(mensajes);
        return mensajesDTO
    }

    async saveMessage(product) {
        const controller = await this.dao.createMensaje(product);
        const mensajesDTO = asDto(controller);
        return mensajesDTO
    }
}


//PERSISTENCIA --> SELECCIONAMOS EL DAO (FACTORY) --> REPOSITORY (DAO-DTO) ---> SERVICIO --> CONTROLLER