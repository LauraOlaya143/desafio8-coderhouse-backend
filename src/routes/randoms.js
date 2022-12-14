import { Router } from "express"
import { fork } from 'child_process';
import path from 'path'
import minimist from 'minimist';

const direccion = path.resolve(__dirname, '../utils/calculo.js');

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

const rutaRandom = Router();

rutaRandom.get('/', (req, res) => {
    const {cant} = req.query;
    const cantidad = parseFloat(cant)
    const computo = fork(direccion, [cantidad]);
    computo.send('inicio');
    computo.on("message", (sum) => {
        res.json({
            resultado: sum,
            PORT: puerto,
        });
    });
});

export default rutaRandom;