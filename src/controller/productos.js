import createError from "http-errors"
import fs from "fs/promises"
import path from "path"
import moment from "moment"
import { v4 as uuidv4 } from 'uuid';

const filePath = path.resolve(__dirname, '../../productos.json');

class ProductosAPI {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async exists(id) {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos);
        const indice = arrayProductos.findIndex(prod => prod.id == id);

        return indice >= 0;
    }

    async getAll() {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos)
        return arrayProductos
    }

    async getById(id) {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos);
        const existe = await this.exists(id)

        if(!existe) throw createError(404, 'producto no encontrado')

        const indice = arrayProductos.findIndex(prod => prod.id == id);

        return arrayProductos[indice]
    }

    async saveNewProduct(newProduct) {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos)

        const {title, price, thumbnail, descripcion, stock} = newProduct

        let newId = 1
        const time = moment().format("DD-MM-YYYY HH:MM:SS")
        const newCodigo = uuidv4();

        if(arrayProductos.length) {
            newId = arrayProductos[arrayProductos.length - 1].id + 1
        }

        const intId = Math.floor(newId)
    
        const product = {
            title,
            price,
            thumbnail,
            id: intId,
            timestamp : time,
            descripcion,
            codigo: newCodigo,
            stock
        }

        arrayProductos.push(product);

        const newData = JSON.stringify(arrayProductos, null, "\t")

        await fs.writeFile(filePath, newData)
            return product
        }

    async updateById (id, newProduct) {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos)
        const indice = arrayProductos.findIndex(prod => prod.id == id);
        const product = arrayProductos[indice]

        const {title, price, thumbnail, descripcion, stock} = newProduct
        const {timestamp, codigo} = product

        const intId = Math.floor(id)

        const productoActualizado = {
            title,
            price,
            thumbnail,
            id: intId,
            timestamp,
            descripcion,
            codigo,
            stock
        }

        arrayProductos.splice(indice, 1, productoActualizado);

        const DataActualizada = JSON.stringify(arrayProductos, null, "\t")
        await fs.writeFile(filePath, DataActualizada)

        return productoActualizado
    }

    async deleteById (id){
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos)
        const indice = arrayProductos.findIndex(prod => prod.id == id);

        arrayProductos.splice(indice, 1);

        const newData = JSON.stringify(arrayProductos, null, "\t")
        await fs.writeFile(filePath, newData)

        return `eliminando el producto con el id: ${id}`
    }

    async eliminarStock(idProducto){
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProductos = JSON.parse(productos);
        const existe = await this.exists(idProducto)

        if(!existe) throw createError(404, 'producto no encontrado')

        const indice = arrayProductos.findIndex(prod => prod.id == idProducto);

        const product = arrayProductos[indice]

        const {title, price, thumbnail, id, timestamp, descripcion, codigo, stock} = product;

        const newStock = stock - 1;

        const newProduct = {
            title,
            price,
            thumbnail,
            id,
            timestamp,
            descripcion,
            codigo,
            stock : newStock
        }

        arrayProductos.splice(indice, 1, newProduct);

        const DataActualizada = JSON.stringify(arrayProductos, null, "\t")
        await fs.writeFile(filePath, DataActualizada)

        return "stock eliminado"
    }
}

const ProductosController = new ProductosAPI(filePath);

export {
    ProductosController
}