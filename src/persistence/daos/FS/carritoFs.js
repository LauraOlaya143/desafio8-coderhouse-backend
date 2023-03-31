import path from "path"
import fs from "fs/promises"

const filePath = path.resolve(__dirname, '../../../../carritos.json');

export default class ClientCarritosFS {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async getAllCarrito() {
        const carrito = await fs.readFile(filePath, 'utf8');
        const arrayCarritos = JSON.parse(carrito); 
        return arrayCarritos
    }

    async getCarritoById(id) {
        const carrito = await fs.readFile(filePath, 'utf8');
        const arrayCarrito = JSON.parse(carrito); 
        const indice = arrayCarrito.findIndex(prod => prod.id == id);

        const carritoSeleccionado = arrayCarrito[indice]

        return carritoSeleccionado
    }

    async createCar () {
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

    async updateCarrito (id, objeto){
        const carrito = await fs.readFile(filePath, 'utf8');
        const arrayCarrito = JSON.parse(carrito); 
        const indiceCarrito = arrayCarrito.findIndex(prod => prod.id == id)

        const carritoActualizado = {
            id: id,
            products : objeto
        }

        arrayCarrito.splice(indiceCarrito, 1, carritoActualizado)

        const newData = JSON.stringify(arrayCarrito, null, "\t")

        await fs.writeFile(filePath, newData)

        const newCarrito = await this.getCarritoById(id)

        return newCarrito
    }

    async deleteCarrito (id){
        const carrito = await fs.readFile(filePath, 'utf8');
        const arrayCarrito = JSON.parse(carrito);

        const indice = arrayCarrito.findIndex(prod => prod.id == id);

        arrayCarrito.splice(indice, 1)

        const newData = JSON.stringify(arrayCarrito, null, "\t")
        await fs.writeFile(filePath, newData) 
    }
}

const CarritoControllerFS = new ClientCarritosFS(filePath);

export {
    CarritoControllerFS
}