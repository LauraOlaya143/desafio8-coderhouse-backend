import mongoose from 'mongoose';
import logger from "../../../../utils/logger.js"
import dotenv from 'dotenv';
dotenv.config();
// || "mongodb://localhost:27017/coderhouse" 
const connection = process.env.MONGO_ATLAS 

const initConnection = async () => {
    try {
        logger.info("Conectando...");
        await mongoose.connect(connection);
        logger.info("Se conecto con exito :)")
    } catch (error) {
        logger.info(`ERROR => ${error}`);
        return error
    }
}

const initDesconnection = async () => {
    try {
        logger.info("Desconectando...");
        await mongoose.disconnect();
        logger.info("Se desconecto con exito :)")
    } catch (error) {
        logger.info(`ERROR => ${error}`);
        return error
    }
}

export {initConnection, initDesconnection}