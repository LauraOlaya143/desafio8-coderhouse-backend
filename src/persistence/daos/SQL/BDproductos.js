import knex from "knex";
import { options } from "../../../options/mariaDB.js"

class ClientSql {
    constructor(config) {
        this.knex = knex(config)
    }

    async createTable() {
        await this.knex.schema.dropTableIfExists("productos")
        await this.knex.schema.createTable("productos", table => {
            table.increments("id").primary();
            table.string("title", 50).notNullable();
            table.integer("price").notNullable();
            table.string("thumbnail").notNullable();
            table.string("timestamp")
            table.string("descripcion").notNullable()
            table.string("codigo")
            table.integer("stock").notNullable()
        })
    }

    async getAllProducts(id) {
        return this.knex.from("productos").select("*")
    }

    async getProductById(id) {
        return this.knex.from("productos").select("*").where("id", id)
    }

    async createProduct(product) {
        await this.knex.from("productos").insert(product)
    }

    async deleteProduct(id) {
        await this.knex.from("productos").where("id", id).del();
    }

    async updateProduct(id, newProd){
        await this.knex.from("productos").where("id", id).update({title: newProd.title, price: newProd.price, thumbnail: newProd.thumbnail, descripcion: newProd.descripcion, stock: newProd.stock})
    }

    async updateStockById(id, newStock){
        await this.knex.from("productos").where("id", id).update({stock: newStock})
    }

    async close(){
        await this.knex.destroy()
    }
}

const sql = new ClientSql(options);

export default sql