import ProductsDTO, { asDto } from '../dto/productos-dto.js';
import {getDao} from "../daos/factory.js"

export default class ProductosReposity {
    constructor() {
        this.dao = getDao();
    }

    async getAll() {
        const productos = await this.dao.getAllProducts();
        const productosDTO = asDto(productos);
        return productosDTO
    }

    async getById(id) {
        const producto = await this.dao.getProductById(id);
        return producto;
    }

    async saveProduct(product) {
        const controller = await this.dao.createProduct(product);
        return controller
    }

    async updateProduct(id, newProduct) {
        const controller = await this.dao.updateProduct(id, newProduct)
        return controller
    }

    async deleteProduct(id) {
        const controller = await this.dao.deleteProduct(id)
        return controller
    }
}


//PERSISTENCIA --> SELECCIONAMOS EL DAO (FACTORY) --> REPOSITORY (DAO-DTO) ---> SERVICIO --> CONTROLLER