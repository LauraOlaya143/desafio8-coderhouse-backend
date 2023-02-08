import { Router } from "express"
import path from "path"
import admin from "../middlewares/auth"
import info from "../middlewares/logger.js"
import * as Productos from "../controller/productosController.js"

const rutaProductos = Router();

rutaProductos.get("/", info, Productos.getAllProducts)

rutaProductos.get("/:id", info, Productos.getProductById)

rutaProductos.post("/", info, admin, Productos.newProducto)

rutaProductos.put("/:id", info, admin, Productos.editarProducto)

rutaProductos.delete("/:id", info, admin, Productos.eliminarProducto)

export default rutaProductos;