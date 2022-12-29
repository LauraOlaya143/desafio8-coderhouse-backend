import { Router } from "express"
import productos from "../routes/productos"
import carritos from "../routes/carrito"
import productosTest from "../routes/productos-test.js"
import rutaUsuarios from "../routes/usuarios.js"
import rutaRandom from "../routes/randoms.js"

const rutaPrincipal = Router();

rutaPrincipal.use("/productos", productos)

rutaPrincipal.use("/carrito", carritos)

rutaPrincipal.use("/productos-test", productosTest)

rutaPrincipal.use("/user", rutaUsuarios)

rutaPrincipal.use("/randoms", rutaRandom)
export default rutaPrincipal;