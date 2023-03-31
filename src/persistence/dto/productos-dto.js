import {getPersistence} from "../daos/factory.js"
import logger from "../../utils/logger.js"

export default class ProductsDTO {
    constructor({ _id, title, price, thumbnail, timestamp, descripcion, codigo, stock }) {
        this.id = _id
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
        this.timestamp = timestamp
        this.descripcion = descripcion,
        this.codigo = codigo
        this.stock = stock
    }
}

class ProductsFsDTO {
    constructor({ id, title, price, thumbnail, descripcion, stock }) {
        this.id = id
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
        this.timestamp = timestamp
        this.descripcion = descripcion,
        this.codigo = codigo
        this.stock = stockcion,
        this.stock = stock
    }
}

export function asDto(prods) {
    const pers = getPersistence(prods)
    logger.info(`persistencia: ${pers}`)
    switch (pers) {
        case "fs":
            if(Array.isArray(prods))
                return prods.map(p => new ProductsFsDTO(p))
            else
                return new ProductsFsDTO(prods)
            break;
        default:
            if(Array.isArray(prods))
                return prods.map(p => new ProductsDTO(p))
            else
                return new ProductsDTO(prods)
            break;
    }
}