import mongoose from "mongoose";
import {productosCollectionName} from "./productos.js"

const carritoCollectionName = "carritos"

const carritoSchema = new mongoose.Schema({
    products: {type : Array , "default" : []}
})

const CarritoModel = mongoose.model(carritoCollectionName, carritoSchema)


export {
    carritoCollectionName,
    CarritoModel
}