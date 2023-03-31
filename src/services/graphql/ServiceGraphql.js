import { buildSchema } from 'graphql';
//Ruta de productos de la DB
import { getAllProductsCtr, getProductByIdCtr, newProductoCtr, editarProductoCtr, eliminarProductoCtr} from '../../controller/graphql/productosController.js';
//Ruta de productos generados de forma aleatoria
import { productosRandomsCtr } from '../../controller/graphql/productos-testController.js';
//Rutas del carrito
import {newCarCtr, eliminarCarritoCtr, getProductsByCarCtr, guardarProductoEnCarritoCtr, eliminarProductoDelCarritoCtr} from "../../controller/graphql/carritoController.js"
//Rutas de mensajes
import {getAllMessagesCtr, saveNewMessageCtr} from "../../controller/graphql/mensajesController.js"

export const graphqlSchema = buildSchema(`
    input InputProduct{
        title: String!
        price: Int!
        thumbnail: String!
        descripcion: String!
        stock: Int!
    }
    input InputCarrito{
        idProducto: String!
    }
    input InputMensaje{
        username: String!
        email: String!
        direccion: String!
        foto: String!
        text: String!
    }
    type authorMensaje{
        username: String!
        email: String!
        direccion: String!
        foto: String!
    }
    type mensaje{
        id: String!
        author: authorMensaje!
        text: String!
        time: String!
    }
    type productRandom{
        id: String!
        title: String!
        price: String!
        thumbnail: String!
        timestamp: String!
        descripcion: String!
        codigo: String!
        stock: Int!
    }
    type product{
        id: String!
        title: String!
        price: Int!
        thumbnail: String!
        descripcion: String!
        stock: Int!
    }
    type carrito{
        id: String!
    }
    type carritoProductos{
        id: String!
        title: String!
        price: Int!
        thumbnail: String!
        descripcion: String!
        codigo: String!
        cantidad: Int!
    }
    type Query{
        getAllProductsCtr:[product]
        getProductByIdCtr(id:String!):product
        productosRandomsCtr:[productRandom]
        getProductsByCarCtr(id:String):[carritoProductos]
        getAllMessagesCtr:[mensaje]
    }
    type Mutation{
        newProductoCtr(data: InputProduct):product
        editarProductoCtr(id: String!, data: InputProduct):product
        eliminarProductoCtr(id: String!):String
        newCarCtr:carrito
        eliminarCarritoCtr(id: String!):String
        guardarProductoEnCarritoCtr(id: String!, data: InputCarrito):String
        eliminarProductoDelCarritoCtr(id: String!, data: InputCarrito):String
        saveNewMessageCtr(data: InputMensaje):mensaje
    }
`)

export const graphqlRoot = {
    getAllProductsCtr, 
    getProductByIdCtr, 
    newProductoCtr, 
    editarProductoCtr, 
    eliminarProductoCtr,
    productosRandomsCtr,
    newCarCtr, 
    eliminarCarritoCtr, 
    getProductsByCarCtr,
    guardarProductoEnCarritoCtr,
    eliminarProductoDelCarritoCtr,
    getAllMessagesCtr,
    saveNewMessageCtr
}