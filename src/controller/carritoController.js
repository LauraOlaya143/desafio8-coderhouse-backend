import { carritoServices } from "../services/carritoService"
import { ProductosController } from "../services/productosService"
import { usuariosModel } from '../persistence/mongodb/schemas/user.js';
import { twilioClient } from "../services/smsService.js";

export const newCar = async (req, res) =>{
    const dataController = await carritoServices.saveNewCar()
    res.json({
        msg: dataController
    })
}

export const eliminarCarrito = async (req, res) => {
    const id = req.params.id;
    const message = await carritoServices.deleteCartById(id)
    res.json({
        msg: message
    })
}

export const getProductsByCar = async (req, res) => {
    const id = req.params.id;
    try{
        const data = await carritoServices.getById(id)
        console.log(data)
        res.json({
            msg: `Productos agregados al carrito con el id ${id}`,
            data
        })
    }catch (err) {
        const status = err.status || 500;
        const message = err.message || "internal server error";

        console.log(err.stack)

        res.status(status).json(
            {
                message
            }
        )
    }
}

export const guardarProductoEnCarrito = async (req, res) =>{
    const idProducto= req.params.idProducto;
    const idCarrito = req.params.idCarrito
    const product = await ProductosController.getById(idProducto);
    const dataController = await carritoServices.saveNewProduct(product, idCarrito)
    const eliminarStock = await ProductosController.eliminarStock(idProducto)
    res.json({
        data: `se guardo el producto con exito en el carrito con el id ${idCarrito}`,
        msg: dataController
    })
}

export const eliminarProductoDelCarrito = async (req, res) => {
    const idCarrito = req.params.idCarrito;
    const idProducto = req.params.idProducto
    const message = await carritoServices.deleteProductoById(idCarrito, idProducto)
    res.json({
        msg: message
    })
}

export const completarCompra = async (req, res) => {
    const idCarrito = req.params.id;
    const Newusuario = req.session.passport

    const password = req.cookies.password

    const _id = Newusuario.user

    console.log(_id)

    const usuario = await usuariosModel.findOne({_id});
    if (!usuario) {
        console.log("usuario no encontrado")
    } else {
        const match = await usuario.matchPassword(password);
        console.log('USUARIO ENCONTRADO!');
    }

    const nombreUsuario = usuario.username

    try{
        const data = await carritoServices.getById(idCarrito)
        console.log(data)

        const msg = "El usuario " + nombreUsuario + " ha realizado una compra"

        const message = {
            body: msg,
            from: process.env.CEL,
            to: process.env.MYCEL,
        };

        const response = await twilioClient.messages.create(message);

        res.json({
            usuario: nombreUsuario,
            msg: `Se realizo la compra de los productos agregados al carrito con el id ${idCarrito}`,
            data
        })
    }catch (err) {
        const status = err.status || 500;
        const message = err.message || "internal server error";

        console.log(err.stack)

        res.status(status).json(
            {
                message
            }
        )
    }
}

