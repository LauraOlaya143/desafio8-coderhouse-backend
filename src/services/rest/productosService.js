import createError from "http-errors"
import fs from "fs/promises"
import path from "path"
import moment from "moment"
import { v4 as uuidv4 } from 'uuid';
import { sql } from "../../persistence/daos/SQL/BDproductos.js"
import { MongoProductosController } from "../../persistence/daos/mongodb/productosMongo.js"
import ProductosReposity from "../../persistence/repository/productosRepository.js";

const productsRepository = new ProductosReposity();

const filePath = path.resolve(__dirname, '../../productos.json');

class ProductosAPI {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async crearBD(){
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos)
        await sql.createTable();
        await sql.insertProduct(arrayProductos)
    }

    async exists(id) {
        const productos = await productsRepository.getAll()
        const indice = productos.findIndex(prod => prod.id == id);

        return indice >= 0;
    }

    async getAll() {
        const productos = await productsRepository.getAll()
        return productos
    }

    async getById(id) {
        const existe = await this.exists(id)

        if(!existe) throw createError(404, 'producto no encontrado :c')

        const indice = await productsRepository.getById(id)
        return indice
    }

    async saveNewProduct(newProduct) {
        const {title, price, thumbnail, descripcion, stock} = newProduct

        const time = moment().format("DD-MM-YYYY HH:MM:SS")
        const newCodigo = uuidv4();
    
        const product = {
            title,
            price,
            thumbnail,
            timestamp : time,
            descripcion,
            codigo: newCodigo,
            stock
        }
        
        const controller = await productsRepository.saveProduct(product);

        return controller

        } 

    async updateById (id, newProduct) {
        const existe = await this.exists(id)

        if(!existe) throw createError(404, 'producto no encontrado :c')
        
        const product = await productsRepository.getById(id)

        const {title, price, thumbnail, descripcion, stock} = newProduct
        const {timestamp, codigo} = product

        const productoActualizado = {
            title,
            price,
            thumbnail,
            timestamp,
            descripcion,
            codigo,
            stock
        }

        const controller = await productsRepository.updateProduct(id, productoActualizado)

        return controller
    }

    async deleteById (id){
        const existe = await this.exists(id)

        if(!existe) throw createError(404, 'producto no encontrado :c')
        
        const controller = await productsRepository.deleteProduct(id)

        return `eliminando el producto con el id: ${id}`
    }

    async eliminarStock(idProducto){
        
        const existe = await this.exists(idProducto)

        if(!existe) throw createError(404, 'producto no encontrado')
        
        const producto = await productsRepository.getById(idProducto)

        const {title, price, thumbnail, timestamp, descripcion, codigo, stock} = producto;

        const newStock = stock - 1;

        if (newStock <= 0) return "No hay estock disponible :c"

        const productoActualizado = {
            title,
            price,
            thumbnail,
            timestamp,
            descripcion,
            codigo,
            stock: newStock
        }

        const controller = await productsRepository.updateProduct(idProducto, productoActualizado)

        return "stock eliminado"
    }
}

//funciones graphql

export const crearProducto = async(obj) => {
    const {title, price, thumbnail, descripcion, stock} = obj

    const time = moment().format("DD-MM-YYYY HH:MM:SS")
    const newCodigo = uuidv4();

    const product = {
        title,
        price,
        thumbnail,
        timestamp : time,
        descripcion,
        codigo: newCodigo,
        stock
    }

    const controller = await productsRepository.saveProduct(product);

    return controller
};

export const getAllProducts = async() => {
    const productos = await productsRepository.getAll()
    return productos
};

export const getProductById = async(id) =>{
    const productos = await productsRepository.getAll()
    const prueba = productos.findIndex(prod => prod.id == id);
    
    const existe = prueba >= 0

    if(!existe) throw createError(404, 'producto no encontrado :c')

    const indice = await productsRepository.getById(id)
    return indice
};

export const editarProducto = async(id, body) =>{
    const productos = await productsRepository.getAll()
    const prueba = productos.findIndex(prod => prod.id == id);
    
    const existe = prueba >= 0

    if(!existe) throw createError(404, 'producto no encontrado :c')

    const product = await MongoProductosController.getProductById(id)

    const {title, price, thumbnail, descripcion, stock} = body
    const {timestamp, codigo} = product

        const productoActualizado = {
            title,
            price,
            thumbnail,
            timestamp,
            descripcion,
            codigo,
            stock
        }

    const producto = await productsRepository.updateProduct(id, productoActualizado)
    return producto;
};

export const eliminarProducto = async(id) =>{
    const productos = await productsRepository.getAll()
    const prueba = productos.findIndex(prod => prod.id == id);
    
    const existe = prueba >= 0

    if(!existe) throw createError(404, 'producto no encontrado :c')

    const controller = await productsRepository.deleteProduct(id)
    return `eliminando el producto con el id: ${id}`
};

export const eliminarStock = async (idProducto) => {
    const productos = await productsRepository.getAll()
    const indice = productos.findIndex(prod => prod.id == idProducto);
    
    const existe = indice >= 0

    if(!existe) throw createError(404, 'producto no encontrado :c')
    
    const producto = await productsRepository.getById(idProducto)

    const {title, price, thumbnail, timestamp, descripcion, codigo, stock} = producto;

    const newStock = stock - 1;

    const productoActualizado = {
        title,
        price,
        thumbnail,
        timestamp,
        descripcion,
        codigo,
        stock: newStock
    }

    const controller = await productsRepository.updateProduct(idProducto, productoActualizado)

    return "stock eliminado"
}

const ProductosController = new ProductosAPI(filePath);

export {
    ProductosController
}