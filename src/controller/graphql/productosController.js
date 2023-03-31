import {getAllProducts, getProductById, crearProducto, editarProducto, eliminarProducto} from "../../services/rest/productosService.js"

export async function getAllProductsCtr(){
    const data = await getAllProducts()
    return data
}

export async function getProductByIdCtr(args){
    const { id } = args;
    const product = await getProductById(id);
    return product;
}

export async function newProductoCtr({data}) {
    const newObj = { ...data }
    console.log(newObj)
    const newProduct = await crearProducto(newObj);
    return newProduct
}

export async function editarProductoCtr({id, data}) {
    const newObj = { ...data }
    const newProduct = await editarProducto(id, newObj);
    return newProduct
}

export async function eliminarProductoCtr(args) {
    const { id } = args;
    const product = await eliminarProducto(id);
    return product;
}