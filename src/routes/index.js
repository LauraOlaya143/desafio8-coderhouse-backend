import { Router } from "express"
import productos from "../routes/productos"
import carritos from "../routes/carrito"
import productosTest from "../routes/productos-test.js"

const rutaPrincipal = Router();

rutaPrincipal.use("/productos", productos)

rutaPrincipal.use("/carrito", carritos)

rutaPrincipal.use("/productos-test", productosTest)

export default rutaPrincipal;