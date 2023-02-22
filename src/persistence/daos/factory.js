import ClientMongo from "./mongodb/productosMongo.js"
import sqlController from "./SQL/BDproductos.js"
import {initConnection} from "./mongodb/db/database.js"

let dao;
let argv = process.argv[2]

//Parametro para test
// let argv = "test";

const init = async () => {
    await initConnection();
}

switch (argv) {
    case "sql":
        dao = new ClientMongo;
        console.log(`Se eligio SQL a partir de los comandos: ${argv}`);
        break;
    case "test":
        init();
        dao = new ClientMongo;
        break
    default:
        dao = new ClientMongo;
        console.log(argv);
        break;
}

export function getDao() {
    return dao;
}