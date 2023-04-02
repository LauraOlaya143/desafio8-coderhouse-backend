import { ProductosController } from "../../services/rest/productosService.js"
// import { sql } from "../controller/BDproductos"
import logger from "../../utils/logger.js"

export const getAllProducts = async (req, res) => {
    try {
        const data = await ProductosController.getAll()
        res.json({
            data
        })
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || "internal server error";

        logger.error(message)

        res.status(status).json(
            {
                message
            }
        )
    }
    
}

export const getProductById = async (req, res) => {
    const id = req.params.id;
    try{
        const product = await ProductosController.getById(id);

        res.json({
            data: product
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

export const newProducto = async (req, res) => {
    const data = req.body;

    logger.info(data);

    const {title, price, thumbnail, descripcion, stock} = req.body

    // se verifica que el precio sea un numero y que sean los campos correctos

    const priceNumber = Math.floor(price)
    const stockNumber = Math.floor(stock)
    const comprobarPrecio = isNaN(priceNumber)
    const comprobarStock = isNaN(stockNumber)

    if(!title || !price || !thumbnail || !descripcion || !stock || comprobarPrecio || comprobarStock){
        logger.error("campos invalidos")
        return res.status(400).json({
            msg: "Campos invalidos"
        })
    }

    // se crea un nuevo usuario y se le envia al controlador

    let nuevoProducto = {
        title,
        price: priceNumber,
        thumbnail,
        descripcion,
        stock: stockNumber
    }

    const dataController = await ProductosController.saveNewProduct(nuevoProducto)

    res.json({
        data: dataController
    })
}

export const editarProducto = async (req, res) => {
    try{
    const id = req.params.id;
    const {title, price, thumbnail, descripcion, stock} = req.body

    const priceNumber = Math.floor(price)
    const stockNumber = Math.floor(stock)
    const comprobarPrecio = isNaN(priceNumber)
    const comprobarStock = isNaN(stockNumber)

    if(!title || !price || !thumbnail || !descripcion || !stock || comprobarPrecio || comprobarStock){
        logger.error("Campos invalidos")
        return res.status(400).json({
            msg: "Campos invalidos"
        })
    }

    const productoActualizado = {
        title,
        price: priceNumber,
        thumbnail,
        descripcion,
        stock: stockNumber
    }

    const DataActualizada = await ProductosController.updateById(id, productoActualizado)

    res.json({
        data: DataActualizada,
    })
    }catch (err) {
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

export const eliminarProducto = async (req, res) => {
    const id = req.params.id;
    try{
        const message = await ProductosController.deleteById(id)

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