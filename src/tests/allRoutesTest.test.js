import {app, myServer} from "../services/server.js"
import {ProductsModel} from "../persistence/daos/mongodb/schemas/productos.js"
import {CarritoModel} from "../persistence/daos/mongodb/schemas/carrito.js"
import {MensajesModel} from "../persistence/daos/mongodb/schemas/mensajes.js"

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
        const id = "6387619904a1cb77f4711482"
        const response = await request(myServer).get(`/api/productos/${id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.data.id).toBe(id)
    })

    it("Probar metodo newProducto", async () => {
        const data = {
            title: 'Barbie',
            price: '15',
            thumbnail: "https://m.media-amazon.com/images/I/61wU8TmQesL.jpg",
            descripcion: "Muñeca barbie por su cumpleaños",
            stock: "100",
        };

        const response = await request(myServer).post("/api/productos").send(data);

        const controller = await ProductsModel.findByIdAndDelete(response.body.data.id)

        expect(response.statusCode).toBe(200)
        expect(response.body.data.title).toBe(data.title)
        expect(response.body.data.price).toBe( Math.floor(data.price))
    })

    it("Probar metodo editarProducto", async () => {
        const data = {
            title: 'Barbie',
            price: '15',
            thumbnail: "https://m.media-amazon.com/images/I/61wU8TmQesL.jpg",
            timestamp: "22-02-2023 16:04:52",
            descripcion: "Muñeca barbie por su cumpleaños",
            codigo: "8987e053-53fa-4f02-a1e7-90560af7ca3e",
            stock: "100",
        };

        const responseCreate = await ProductsModel.create(data)
        
        const dataUpdate = {
            title: 'Barbie',
            price: '25',
            thumbnail: "https://m.media-amazon.com/images/I/61wU8TmQesL.jpg",
            descripcion: "Muñeca barbie por su cumpleaños",
            stock: "50",
        };

        const response = await request(myServer).put(`/api/productos/${responseCreate._id}`).send(dataUpdate);

        const controller = await ProductsModel.findByIdAndDelete(responseCreate._id)
        
        expect(response.statusCode).toBe(200)
        expect(response.body.data.stock).toBe(Math.floor(dataUpdate.stock))
        expect(response.body.data.price).toBe(Math.floor(dataUpdate.price))
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

describe("Test de la ruta Carritos", () => {
    it("probar metodo getCarritoById", async () => {

        const response = await request(myServer).get("/api/carrito/63e2d790786c647c6e8889f4/productos")

        expect(response.statusCode).toBe(200)
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data).toBeInstanceOf(Array)
    })

    it("Probar metodo newCar", async () => {
        const data = []

        const response = await request(myServer).post("/api/carrito").send(data);

        const controller = await CarritoModel.findByIdAndDelete(response.body.msg.id)

        expect(response.statusCode).toBe(200)
        expect(response.body.msg.productos).toStrictEqual(data)
    })

    it("Probar metodo eliminarCarrito", async () => {
        const array = []

        const responseCreate = await CarritoModel.create({products: array})

        const stringEsperado = `eliminando el carrito con el id: ${responseCreate._id}`

        const response = await request(app).delete(`/api/carrito/${responseCreate._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe(stringEsperado)
    })

    it("Probar metodo guardarProductoEnCarrito", async () => {
        const array = []
        const idProducto = "6387619904a1cb77f4711482"

        const responseCreate = await CarritoModel.create({products: array})

        const response = await request(app).post(`/api/carrito/${responseCreate._id}/productos/${idProducto}`).send(array)

        const controller = await CarritoModel.findByIdAndDelete(responseCreate._id)

        expect(response.statusCode).toBe(200)
        expect(response.body.data).toEqual(expect.stringContaining(`${responseCreate._id}`))
        expect(response.body.msg[0].id).toBe(idProducto)
    })

    it("Probar metodo eliminarProductoDelCarrito", async () => {
        const array = []
        const idProducto1 = "6387619904a1cb77f4711482"
        const idProducto2 = "6387619904a1cb77f4711484"

        const responseCreate = await CarritoModel.create({products: array})
        const producto1 = await ProductsModel.findById(idProducto1)
        const producto2 = await ProductsModel.findById(idProducto2)

        const arrayProductos = [producto1, producto2]

        const carritoUpdated = await CarritoModel.findByIdAndUpdate(
            responseCreate._id,
            { products: arrayProductos },
            { new: true }
        );

        const response = await request(app).delete(`/api/carrito/${responseCreate._id}/productos/${idProducto2}`)

        const controller = await CarritoModel.findByIdAndDelete(responseCreate._id)

        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toEqual(expect.stringContaining(`${responseCreate._id}`))
        expect(response.body.msg).toEqual(expect.stringContaining(`${idProducto2}`))
    })
})

describe("Test de la ruta ProductosRandom", () => {

    it("probar metodo getProductosRandoms", async () => {

        const response = await request(myServer).get("/api/productos-test")

        expect(response.statusCode).toBe(200)
        expect(response.body.data).toHaveLength(5);
        expect(response.body.data).toBeInstanceOf(Array)
    })
})

describe("Test de la ruta mensajes", () => {

    it("probar metodo getAllMensajes", async () => {

        const response = await request(myServer).get("/mensajes")

        expect(response.statusCode).toBe(200)
        expect(response.body.data).toBeInstanceOf(Array)
    })

    it("Probar metodo saveNewMessage", async () => {
        const objetoUsuario = {
            username: "lau14", 
            email: "laura14@gmail.com", 
            direccion: "mila4", 
            foto: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bc2642ea-5bf4-4c5f-8710-f464bc4c06d3/dex6jku-af7fc050-698b-4a42-a685-2113397a3ac2.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JjMjY0MmVhLTViZjQtNGM1Zi04NzEwLWY0NjRiYzRjMDZkM1wvZGV4NmprdS1hZjdmYzA1MC02OThiLTRhNDItYTY4NS0yMTEzMzk3YTNhYzIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.QtEgEZAy4d6M7YpHyZZ4K_qqFIyzpgTAZdipbNFjwac",
            text: "Hola! soy una prueba!"
        }

        const response = await request(myServer).post("/mensajes").send(objetoUsuario);

        const controller = await MensajesModel.findByIdAndDelete(response.body.data._id)

        expect(response.statusCode).toBe(200)
        expect(response.body.data).toBeInstanceOf(Object)
        expect(response.body.data.author.username).toBe(objetoUsuario.username)
        expect(response.body.data.text).toBe(objetoUsuario.text)
    })
})
