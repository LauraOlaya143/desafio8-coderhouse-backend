import {faker} from "@faker-js/faker"
import moment from "moment"
import { v4 as uuidv4 } from 'uuid';

export const productosRandoms = async() => {
    let respuesta = [];
    for (let i = 0; i < 5; i++) {
        const time = moment().format("DD-MM-YYYY HH:MM:SS");
        const newCodigo = uuidv4();
        const newStock = faker.random.numeric(3);
        const newStockNumber = Math.floor(newStock)

        respuesta.push({
            id: faker.database.mongodbObjectId(),
            title: faker.commerce.product(),
            price: faker.commerce.price(100, 200, 0, '$'),
            thumbnail: faker.internet.avatar(),
            timestamp: time,
            descripcion: faker.commerce.productDescription(),
            codigo: newCodigo,
            stock: newStockNumber
        })
    }

    return respuesta
};