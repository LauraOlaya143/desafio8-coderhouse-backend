import ProductsDTO, { asDto } from '../dto/productos-dto.js';
import {getDaoProductos} from "../daos/factory.js"

export default class ProductosReposity {
    constructor() {
        this.dao = getDaoProductos();
    }

    async getAll() {
        const productos = await this.dao.getAllProducts();
        const productosDTO = asDto(productos);
        return productosDTO
    }

    async getById(id) {
        const producto = await this.dao.getProductById(id);
        const productoDTO = asDto(producto);
        return productoDTO;
    }

    async saveProduct(product) {
        const controller = await this.dao.createProduct(product);
        const controllerDTO = asDto(controller);
        return controllerDTO
    }

    async updateProduct(id, newProduct) {
        const controller = await this.dao.updateProduct(id, newProduct)
        const controllerDTO = asDto(controller);
        return controllerDTO
    }

    async deleteProduct(id) {
        const controller = await this.dao.deleteProduct(id)
        return controller
    }
}


//PERSISTENCIA --> SELECCIONAMOS EL DAO (FACTORY) --> REPOSITORY (DAO-DTO) ---> SERVICIO --> CONTROLLER