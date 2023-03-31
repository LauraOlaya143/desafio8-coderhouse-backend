import createError from "http-errors"
// import {MongoCarritoController} from "../../persistence/daos/mongodb/carritoMongo.js"
import {getAll, getById, crearNuevoCarrito, agregarProducto, eliminarCarrito} from "../../persistence/repository/carritoRepository.js"
import ProductosReposity from "../../persistence/repository/productosRepository.js";

const productsRepository = new ProductosReposity();

class CarritoAPI {

    async exists(id) {
        const arrayCarritos = await getAll()
        const indice = arrayCarritos.findIndex(prod => prod.id == id);

        return indice >= 0;
    }

    async getById(id) {
        const existe = await this.exists(id)

        if(!existe) throw createError(404, 'carrito no encontrado :c')

        const carrito = await getById(id);

        const productosDelCarrito = carrito.productos

        return productosDelCarrito
    }

    async saveNewCar() {
        const carrito = await crearNuevoCarrito()
        
        return carrito
    }

    async saveNewProduct(producto, idCarrito) {
        const existe = await this.exists(idCarrito)
        let cantidad = 1;
        let newProduct = {}

        const {title, price, thumbnail, id, descripcion, codigo} = producto

        if(!existe) throw createError(404, 'carrito no encontrado :c')

        //const carrito = await MongoCarritoController.getCarritoById(idCarrito)
        const carrito = await getById(idCarrito);

        const productosDelCarrito = carrito.productos
        const indiceProducto = productosDelCarrito.findIndex(prod => prod.id == id);

        if(indiceProducto >= 0){
            const productoYaExiste = productosDelCarrito[indiceProducto]
            let newCantidad = productoYaExiste.cantidad
            cantidad = cantidad + newCantidad;

            newProduct = {
                title,
                price, 
                thumbnail,
                id,
                descripcion,
                codigo,
                cantidad
            }

            productosDelCarrito.splice(indiceProducto, 1, newProduct)

        } else { 
            newProduct = {
                title,
                price, 
                thumbnail,
                id,
                descripcion,
                codigo,
                cantidad
            }

            productosDelCarrito.push(newProduct);
            
        }

        //const update = await MongoCarritoController.updateCarrito(idCarrito, productosDelCarrito)
        const update = await agregarProducto(idCarrito, productosDelCarrito)

        return productosDelCarrito
    }

    async deleteCartById (id) {
        // const carritoEliminado = await MongoCarritoController.deleteCarrito(id)
        const existe = await this.exists(id)

        if(!existe) throw createError(404, 'carrito no encontrado :c')

        const carritoEliminado = await eliminarCarrito(id)

        return `eliminando el carrito con el id: ${id}`
    }

    async deleteProductoById (idCarrito, idProducto){
        // const carrito = await MongoCarritoController.getCarritoById(idCarrito)
        const existe = await this.exists(idCarrito)
        
        if(!existe) throw createError(404, 'carrito no encontrado :c')

        const carrito = await getById(idCarrito);
        const productos = carrito.productos

        const productoIndice = productos.findIndex(prod => prod.id == idProducto)

        productos.splice(productoIndice, 1)

        // const update = await MongoCarritoController.updateCarrito(idCarrito, productos)
        const update = await agregarProducto(idCarrito, productos)

        return `se elimino el producto con el id ${idProducto} del carrito con el id ${idCarrito}`
    }
}

// funciones para graphql

export const crearCarrito = async () => {
    const carrito = await crearNuevoCarrito()
    return carrito
}

export const getCarById =  async (id) => {
    const arrayCarritos = await getAll()
    const indice = arrayCarritos.findIndex(prod => prod.id == id);
    const existe = indice >= 0;

    if(!existe) throw createError(404, 'carrito no encontrado')

    const carrito = await getById(id);

    const productosDelCarrito = carrito.productos

    return productosDelCarrito
}

const exists = async (id) => {
    const arrayCarritos = await getAll()
    const indice = arrayCarritos.findIndex(prod => prod.id == id);

    return indice >= 0;
}

export const guardarProducto = async (idCarrito, newObj) => {
    const existe = exists(idCarrito)
    let cantidad = 1;
    let newProduct = {}

    const id = newObj.idProducto
    console.log(id)

    const producto = await productsRepository.getById(id)

    const {title, price, thumbnail, descripcion, codigo} = producto

    if(!existe) throw createError(404, 'carrito no encontrado :c')

    const carrito = await getById(idCarrito);

    const productosDelCarrito = carrito.productos
    const indiceProducto = productosDelCarrito.findIndex(prod => prod.id == id);

    if(indiceProducto >= 0){
        const productoYaExiste = productosDelCarrito[indiceProducto]
        let newCantidad = productoYaExiste.cantidad
        cantidad = cantidad + newCantidad;

        newProduct = {
            title,
            price, 
            thumbnail,
            id,
            descripcion,
            codigo,
            cantidad
        }

        productosDelCarrito.splice(indiceProducto, 1, newProduct)
    } else { 
        newProduct = {
            title,
            price, 
            thumbnail,
            id,
            descripcion,
            codigo,
            cantidad
        }

        productosDelCarrito.push(newProduct);
    }

    const update = await agregarProducto(idCarrito, productosDelCarrito)

    return productosDelCarrito
}

export const deleteCartById = async (id) => {
    const carritoEliminado = await eliminarCarrito(id)

    return `eliminando el carrito con el id: ${id}`
}

export const deleteProductoById = async (idCarrito, idProducto) => {
    const carrito = await getById(idCarrito);
    const productos = carrito.productos

    const productoIndice = productos.findIndex(prod => prod.id == idProducto)

    productos.splice(productoIndice, 1)

    const update = await agregarProducto(idCarrito, productos)

    return `se elimino el producto con el id ${idProducto} del carrito con el id ${idCarrito}`
}

const carritoServices = new CarritoAPI();

export {
    carritoServices
}