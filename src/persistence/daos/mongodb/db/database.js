import mongoose from 'mongoose';
const dotenv = require("dotenv");

dotenv.config();
// || "mongodb://localhost:27017/coderhouse" 
const connection = process.env.MONGO_ATLAS 

const initConnection = async () => {
    try {
        console.log("Conectando...");
        await mongoose.connect(connection);
        console.log("Se conecto con exito :)")
    } catch (error) {
        console.log(`ERROR => ${error}`);
        return error
    }
}

const initDesconnection = async () => {
    try {
        console.log("Desconectando...");
        await mongoose.disconnect();
        console.log("Se desconecto con exito :)")
    } catch (error) {
        console.log(`ERROR => ${error}`);
        return error
    }
}

export {initConnection, initDesconnection}