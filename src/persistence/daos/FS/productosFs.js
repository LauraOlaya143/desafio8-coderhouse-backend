import path from "path"
import fs from "fs/promises"
import logger from "../../../utils/logger.js"

const filePath = path.resolve(__dirname, '../../../../productos.json');


export default class ClientProductosFS {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async exists(id) {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos);
        const indice = arrayProductos.findIndex(prod => prod.id == id);

        return indice >= 0;
    }

    async getAllProducts() {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos)
        return arrayProductos
    }

    async getProductById(id) {
        logger.info(id)
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos);
        const existe = await this.exists(id)

        if(!existe) throw createError(404, 'producto no encontrado')

        const indice = arrayProductos.findIndex(prod => prod.id == id);

        const producto = arrayProductos[indice]

        logger.info(producto)

        return producto
    }

    async createProduct(newProduct) {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos)

        let newId = 1

        if(arrayProductos.length) {
            newId = arrayProductos[arrayProductos.length - 1].id + 1
        }

        const intId = Math.floor(newId)
    
        const product = {
            id: intId,
            ...newProduct
        }

        arrayProductos.push(product);

        const newData = JSON.stringify(arrayProductos, null, "\t")

        await fs.writeFile(filePath, newData)
            return product
        }

    async updateProduct (id, newProduct) {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos)
        const indice = arrayProductos.findIndex(prod => prod.id == id);

        const intId = Math.floor(id)

        const productoActualizado = {
            id: intId,
            ...newProduct
        }

        arrayProductos.splice(indice, 1, productoActualizado);

        const DataActualizada = JSON.stringify(arrayProductos, null, "\t")
        await fs.writeFile(filePath, DataActualizada)

        return productoActualizado
    }

    async deleteProduct (id){
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos)
        const indice = arrayProductos.findIndex(prod => prod.id == id);

        arrayProductos.splice(indice, 1);

        const newData = JSON.stringify(arrayProductos, null, "\t")
        await fs.writeFile(filePath, newData)

        return `eliminando el producto con el id: ${id}`
    }
}

const FsProductosController = new ClientProductosFS(filePath);

export {
    FsProductosController
}