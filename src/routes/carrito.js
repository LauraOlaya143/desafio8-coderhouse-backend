import { Router } from "express"
import info from "../middlewares/logger.js"
import * as Carrito from "../controller/rest/carritoController.js"

const rutaCarrito = Router();

rutaCarrito.get("/:id/productos", info, Carrito.getProductsByCar)

rutaCarrito.post("/", info, Carrito.newCar)

rutaCarrito.delete("/:id", info, Carrito.eliminarCarrito)

rutaCarrito.post("/:idCarrito/productos/:idProducto", info, Carrito.guardarProductoEnCarrito)

rutaCarrito.delete("/:idCarrito/productos/:idProducto", info, Carrito.eliminarProductoDelCarrito)

rutaCarrito.post("/comprar/:id", info, Carrito.completarCompra)

export default rutaCarrito;