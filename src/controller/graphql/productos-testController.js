import {productosRandoms} from "../../services/rest/productos-testService.js"

export async function productosRandomsCtr(){
    const data = await productosRandoms()
    return data
}