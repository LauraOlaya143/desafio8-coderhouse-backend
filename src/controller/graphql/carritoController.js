import { crearCarrito, getCarById, guardarProducto, deleteCartById, deleteProductoById} from "../../services/rest/carritoService.js"
import {eliminarStock} from "../../services/rest/productosService.js"

export async function newCarCtr(){
    const dataController = await crearCarrito()
    return dataController
}

export async function eliminarCarritoCtr(args) {
    const { id } = args
    const message = await deleteCartById(id)
    return message
}

export async function getProductsByCarCtr(args) {
    const { id } = args
    try{
        const data = await getCarById(id)
        console.log(data)
        return data
    }catch (err) {
        console.log(err.stack)
    }
}

export async function guardarProductoEnCarritoCtr ({id, data}) {
    const newObj = { ...data }
    const idProducto = newObj.idProducto
    const dataController = await guardarProducto(id, newObj)
    const deleteStock = await eliminarStock(idProducto)
    return `se guardo el producto con exito en el carrito`
}

export async function eliminarProductoDelCarritoCtr ({id, data}) {
    const newObj = { ...data }
    const idProducto = newObj.idProducto
    const message = await deleteProductoById(id, idProducto)
    return message
}