import path from 'path'
import minimist from 'minimist';
import { fork } from 'child_process';
import logger from "../../utils/logger.js"

const direccion = path.resolve(__dirname, '../../utils/calculo.js');

logger.info(direccion)

const objetoConfiguracion = {
    alias: {
        p: "port",
        m: "modo"
    },
    default: {
        port: 8080,
        modo: "FOLK"
    }
}

const args = minimist(process.argv, objetoConfiguracion);

const puerto = args.port;

export const getRandoms = async (req, res) => {
    const {cant} = req.params;
    const cantidad = parseFloat(cant)
    const computo = fork(direccion, [cantidad]);
    computo.send('inicio');
    computo.on("message", (sum) => {
        res.json({
            port: puerto,
            resultado: sum,
        });
    });
}
