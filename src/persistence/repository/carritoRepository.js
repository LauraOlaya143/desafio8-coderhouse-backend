import CarritoDTO, { asDto } from '../dto/carrito-dto.js';
import {getDaoCar} from "../daos/factory.js"


const dao = getDaoCar();

export const getAll = async () => {
    const carritos = await dao.getAllCarrito();
    const carritosDTO = asDto(carritos);
    return carritosDTO
}

export const crearNuevoCarrito = async () => {
    const controller = await dao.createCar();
    const controllerDTO = asDto(controller);
    return controllerDTO
}

export const getById = async (id) => {
    const carrito = await dao.getCarritoById(id);
    const carritoDTO = asDto(carrito);
    return carritoDTO
}

export const agregarProducto = async (id, newProd) => {
    const controller = await dao.updateCarrito(id, newProd)
    return controller
}

export const eliminarCarrito = async (id) => {
    const controller = await dao.deleteCarrito(id)
    return controller
}


//PERSISTENCIA --> SELECCIONAMOS EL DAO (FACTORY) --> REPOSITORY (DAO-DTO) ---> SERVICIO --> CONTROLLER