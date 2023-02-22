import {app, myServer} from "../services/server.js"
import mongoose from "mongoose";
import {ProductsModel} from "../persistence/daos/mongodb/schemas/productos.js"
import request from "supertest";

jest.setTimeout(80000)

describe("Test de la ruta Productos", () => {

    it("probar metodo getAll", async () => {

        const response = await request(myServer).get("/api/productos")

        expect(response.statusCode).toBe(200)
        expect(response.body.data).toHaveLength(3);
        expect(response.body.data).toBeInstanceOf(Array)
    })

    it("probar metodo getById", async () => {

        const data = await request(myServer).get("/api/productos")
        const response = await request(myServer).get("/api/productos/6387619904a1cb77f4711482")

        expect(response.statusCode).toBe(200)
        expect(response.body.data._id).toBe(data.body.data[0].id)
    })

    xit("Probar metodo newProducto", async () => {
        const data = {
            title: 'Barbie',
            price: '15',
            thumbnail: "https://m.media-amazon.com/images/I/61wU8TmQesL.jpg",
            descripcion: "Muñeca barbie por su cumpleaños",
            stock: "100",
        };

        const response = await request(myServer).post("/api/productos").send(data);
        expect(response.statusCode).toBe(200)
        expect(response.body.data.title).toBe(data.title)
        expect(response.body.data.price).toBe( Math.floor(data.price))
    })

    xit("Probar metodo editarProducto", async () => {
        const data = {
            title: 'Ever After High Doll',
            price: '40',
            thumbnail: "https://ae01.alicdn.com/kf/HTB1kRsfKpXXXXXYXVXXq6xXFXXXu/Genuine-Original-Ever-After-High-Madeline-Hatter-Dolls-Toys-Christmas-New-Year-Birthday-Gifts-Brand-Good.jpg_Q90.jpg_.webp",
            descripcion: "Muñeca Ever After High del año 2013",
            stock: "50",
        };

        const response = await request(myServer).put(`/api/productos/6387619904a1cb77f4711483`).send(data);
        expect(response.statusCode).toBe(200)
        expect(response.body.data.stock).toBe(Math.floor(data.stock))
        expect(response.body.data.price).toBe(Math.floor(data.price))
    })

    it("Probar metodo eliminarProducto", async () => {
        const data = {
            title: 'Barbie2',
            price: '15',
            thumbnail: "https://m.media-amazon.com/images/I/61wU8TmQesL.jpg",
            timestamp: "22-02-2023 16:04:52",
            descripcion: "Muñeca barbie por su cumpleaños",
            codigo: "8987e053-53fa-4f02-a1e7-90560af7ca3e",
            stock: "100",
        };
        const responseCreate = await ProductsModel.create(data)
        const response = await request(app).delete(`/api/productos/${responseCreate._id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toEqual(expect.stringContaining(`${responseCreate._id}`))
    })
})