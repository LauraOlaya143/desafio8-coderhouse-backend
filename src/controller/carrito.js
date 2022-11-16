import createError from "http-errors"
import fs from "fs/promises"
import path from "path"

const filePath = path.resolve(__dirname, '../../carritos.json');

class CarritoAPI {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async exists(id) {
        const carrito = await fs.readFile(filePath, 'utf8');
        const arrayCarritos = JSON.parse(carrito);
        const indice = arrayCarritos.findIndex(prod => prod.id == id);

        return indice >= 0;
    }

    async getById(id) {
        const carrito = await fs.readFile(filePath, 'utf8');
        const arrayCarrito = JSON.parse(carrito);
        const existe = await this.exists(id)

        if(!existe) throw createError(404, 'carrito no encontrado')

        const indice = arrayCarrito.findIndex(prod => prod.id == id);

        const carritoSeleccionado = arrayCarrito[indice]

        const productosDelCarrito = carritoSeleccionado.products

        return productosDelCarrito
    }

    async saveNewCar() {
        const carrito = await fs.readFile(filePath, 'utf8');
        const arrayCarrito = JSON.parse(carrito)

        let newId = 1

        if(arrayCarrito.length) {
            newId = arrayCarrito[arrayCarrito.length - 1].id + 1
        }

        const intId = Math.floor(newId)
    
        const product = {
            id: intId,
            products: []
        }

        arrayCarrito.push(product);

        const newData = JSON.stringify(arrayCarrito, null, "\t")

        await fs.writeFile(filePath, newData)
            return product
    }

    async saveNewProduct(producto, idCarrito) {
        const carrito = await fs.readFile(filePath, 'utf8');
        const arrayCarrito = JSON.parse(carrito);
        const existe = await this.exists(idCarrito)
        const indiceCarrito = arrayCarrito.findIndex(prod => prod.id == idCarrito)
        let cantidad = 1;

        const {title, price, thumbnail, id, timestamp, descripcion, codigo} = producto

        if(!existe) throw createError(404, 'carrito no encontrado')

        const carritoSeleccionado = arrayCarrito[indiceCarrito]

        const productosDelCarrito = carritoSeleccionado.products
        const indiceProducto = productosDelCarrito.findIndex(prod => prod.id == id);

        let productoYaExiste = productosDelCarrito[indiceProducto]
        
        if(productoYaExiste){
            let newCantidad = productoYaExiste.cantidad
            cantidad = cantidad + newCantidad;
        }
        const boolean = indiceProducto >= 0

        if(!boolean){

        const newProduct = {
            title,
            price, 
            thumbnail,
            id,
            timestamp,
            descripcion,
            codigo,
            cantidad
        }

        productosDelCarrito.push(newProduct);
        } else {
            productoYaExiste.cantidad = cantidad
            productosDelCarrito.splice(indiceProducto, 1, productoYaExiste)
        }

        const carritoActualizado = {
            id: carritoSeleccionado.id,
            products : productosDelCarrito
        }

        arrayCarrito.splice(indiceCarrito, 1, carritoActualizado)

        const newData = JSON.stringify(arrayCarrito, null, "\t")

        await fs.writeFile(filePath, newData)

        return productosDelCarrito
    }

    async deleteCartById (id) {
        const carrito = await fs.readFile(filePath, 'utf8');
        const arrayCarrito = JSON.parse(carrito);

        const indice = arrayCarrito.findIndex(prod => prod.id == id);

        arrayCarrito.splice(indice, 1)

        const newData = JSON.stringify(arrayCarrito, null, "\t")
        await fs.writeFile(filePath, newData)

        return `eliminando el carrito con el id: ${id}`
    }

    async deleteProductoById (idCarrito, idProducto){
        const carrito = await fs.readFile(filePath, 'utf8');
        const arrayCarrito = JSON.parse(carrito);
        const indiceCarrito = arrayCarrito.findIndex(prod => prod.id == idCarrito)

        const carritoSeleccionado = arrayCarrito[indiceCarrito]
        const productosDelCarrito = carritoSeleccionado.products

        const productoIndice = productosDelCarrito.findIndex(prod => prod.id == idProducto)

        productosDelCarrito.splice(productoIndice, 1)

        const carritoActualizado = {
            id: carritoSeleccionado.id,
            products : productosDelCarrito
        }

        arrayCarrito.splice(indiceCarrito, 1, carritoActualizado)

        const newData = JSON.stringify(arrayCarrito, null, "\t")

        await fs.writeFile(filePath, newData)

        return `se elimino el producto con el id ${idProducto} del carrito con el id ${idCarrito}`
    }
}

const carritoController = new CarritoAPI(filePath);

export {
    carritoController
}