import { Router } from "express"
import productos from "../routes/productos"
import carritos from "../routes/carrito"

const rutaPrincipal = Router();

rutaPrincipal.use("/productos", productos)

rutaPrincipal.use("/carrito", carritos)

export default rutaPrincipal;