import {getPersistence} from "../daos/factory.js"
import logger from "../../utils/logger.js"

export default class CarritoDTO {
    constructor({ _id, products }) {
        this.id = _id
        this.productos = products
    }
}

class CarritoFsDTO {
    constructor({ id, products }) {
        this.id = id
        this.productos = products
    }
}

export function asDto(prods) {
    const pers = getPersistence(prods)
    logger.info(`persistencia: ${pers}`)
    switch (pers) {
        case "fs":
            if(Array.isArray(prods))
                return prods.map(p => new CarritoFsDTO(p))
            else
                return new CarritoFsDTO(prods)
            break;
        default:
            if(Array.isArray(prods))
                return prods.map(p => new CarritoDTO(p))
            else
                return new CarritoDTO(prods)
            break;
    }
}