import { Router } from "express"
import admin from "../middlewares/auth"
import {faker} from "@faker-js/faker"
import moment from "moment"
import { v4 as uuidv4 } from 'uuid';

const rutaProductosTest = Router();

rutaProductosTest.get("/", async (req, res) => {
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
            thumbnail: faker.image.animals(1234, 2345, true),
            timestamp: time,
            descripcion: faker.commerce.productDescription(),
            codigo: newCodigo,
            stock: newStockNumber
        })
    }

    res.json({
        data: respuesta
    })
})

export default rutaProductosTest;