import { carritoServices } from "../../services/rest/carritoService"
import { ProductosController } from "../../services/rest/productosService.js"
import { usuariosModel } from '../../persistence/daos/mongodb/schemas/user.js';
import { twilioClient } from "../../services/smsService.js";
import logger from "../../utils/logger.js"

export const newCar = async (req, res) =>{
    const dataController = await carritoServices.saveNewCar()
    res.json({
        msg: dataController
    })
}

export const eliminarCarrito = async (req, res) => {
    const id = req.params.id;
    try {
        const message = await carritoServices.deleteCartById(id)
        res.json({
            msg: message
        })
    } catch (err) {
        const status = err.status || 500;
        const message = err.message || "internal server error";

        logger.error(message)

        res.status(status).json(
            {
                message
            }
        )
    }
    
}

export const getProductsByCar = async (req, res) => {
    const id = req.params.id;
    try{
        const data = await carritoServices.getById(id)
        res.json({
            msg: `Productos agregados al carrito con el id ${id}`,
            data
        })
    }catch (err) {
        const status = err.status || 500;
        const message = err.message || "internal server error";

        logger.error(err.stack)

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
    try {
        const product = await ProductosController.getById(idProducto);
        const eliminarStock = await ProductosController.eliminarStock(idProducto)

        if(eliminarStock == "No hay estock disponible :c"){
            res.json({
                data: eliminarStock,
            })
        } else{
            const dataController = await carritoServices.saveNewProduct(product, idCarrito)
            res.json({
                msg: `se guardo el producto con exito en el carrito con el id ${idCarrito}`,
                data: dataController
            })
        }
    } catch (err) {
        const status = err.status || 500;
        const message = err.message || "internal server error";

        logger.error(message)

        res.status(status).json(
            {
                message
            }
        )
    }
    
    
}

export const eliminarProductoDelCarrito = async (req, res) => {
    const idCarrito = req.params.idCarrito;
    const idProducto = req.params.idProducto
    try {
        const message = await carritoServices.deleteProductoById(idCarrito, idProducto)
        res.json({
            msg: message
        })
    } catch (err) {
        const status = err.status || 500;
        const message = err.message || "internal server error";

        logger.error(message)

        res.status(status).json(
            {
                message
            }
        )
    }
    
}

export const completarCompra = async (req, res) => {
    const idCarrito = req.params.id;
    const Newusuario = req.session.passport

    const password = req.cookies.password

    const _id = Newusuario.user

    logger.info(_id)

    const usuario = await usuariosModel.findOne({_id});
    if (!usuario) {
        logger.warn("usuario no encontrado")
        res.json({
            msg: "No puedes realizar una compra si no estas logeado"
        })
    } else {
        const match = await usuario.matchPassword(password);
        logger.info("USUARIO ENCONTRADO!")

        const nombreUsuario = usuario.username

        try{
            const data = await carritoServices.getById(idCarrito)
            logger.info(data)

            const msg = "El usuario " + nombreUsuario + " ha realizado una compra"

            const message = {
                body: msg,
                from: process.env.CEL,
                to: process.env.MYCEL,
            };

            //Funcion para enviar un mensaje de texto con Twilio

            // const response = await twilioClient.messages.create(message);

            res.json({
                usuario: nombreUsuario,
                msg: `Se realizo la compra de los productos agregados al carrito con el id ${idCarrito}`,
                data
            })
        }   catch (err) {
            const status = err.status || 500;
            const message = err.message || "internal server error";

            logger.error(err.stack)

            res.status(status).json(
                {
                    message
                }
            )
        }
    }

    
}



