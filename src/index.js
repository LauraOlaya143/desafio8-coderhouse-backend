import "dotenv/config"
import server from "./services/server"
import {initConnection} from "./db/database.js"
import minimist from 'minimist';

const objetoConfiguracion = {
    alias: {
        p: "port"
    },
    default: {
        port: 8080,
    }
}

const args = minimist(process.argv, objetoConfiguracion);

const puerto = args.port;

const init = async () => {
    await initConnection();

    server.listen(puerto, () => {
    console.log(`servidor listo, puerto: ${puerto}`)
})
}

init();