import ClientMongo from "./mongodb/productosMongo.js"
import sqlController from "./SQL/BDproductos.js"

let dao;
let argv = process.argv[2];

switch (argv) {
    case "sql":
        dao = new ClientMongo;
        console.log(`Se eligio SQL a partir de los comandos: ${argv}`);
        break;
    default:
        dao = new ClientMongo;
        console.log(argv);
        break;
}

export function getDao() {
    return dao;
}