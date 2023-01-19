import logger from "../utils/logger.js"

const info = (req, res, next) => {
    const ruta = req.protocol + '://' + req.get('host') + req.originalUrl;
    const metodo = req.method

    const objInfo = {
        ruta,
        metodo
    }

    logger.info(objInfo)

    next()
}

export default info