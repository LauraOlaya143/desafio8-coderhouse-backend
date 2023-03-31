import {CarritoModel} from "./schemas/carrito.js"

export default class ClientMongoCarritos {
    async getAllCarrito() {
        const carritos = await CarritoModel.find();
        return carritos
    }

    async getCarritoById(id) {
        const carrito = await CarritoModel.findById(id);
        if(!carrito){
            return "Producto no encontrado :c"
        }

        return carrito
    }

    async createCar () {
        const array = []
        const newCarrito = await CarritoModel.create({products: array})

        return newCarrito
    }

    async updateCarrito (id, objeto){
        const carritoUpdated = await CarritoModel.findByIdAndUpdate(
            id,
            { products: objeto },
            { new: true }
        );

        return carritoUpdated
    }

    async deleteCarrito (id){
        const carrito = await CarritoModel.findByIdAndDelete(id)
        const data = {
            msg: "Producto eliminado",
            carrito
        }

        return data
    }
}

const MongoCarritoController = new ClientMongoCarritos();

export {
    MongoCarritoController
}