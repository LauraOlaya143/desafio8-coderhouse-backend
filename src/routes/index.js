import { Router } from "express"
import productos from "../routes/productos"
import carritos from "../routes/carrito"
import productosTest from "../routes/productos-test.js"
import rutaUsuarios from "../routes/usuarios.js"

const rutaPrincipal = Router();

rutaPrincipal.use("/productos", productos)

rutaPrincipal.use("/carrito", carritos)

rutaPrincipal.use("/productos-test", productosTest)

rutaPrincipal.use("/user", rutaUsuarios)

export default rutaPrincipal;