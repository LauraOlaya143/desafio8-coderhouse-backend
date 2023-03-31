import {usuariosModel} from "./schemas/user.js"

export default class ClientMongoUsuarios {
    
    async getAllUser() {
        const users = await usuariosModel.find();
        return users
    }
}

const MongoUserController = new ClientMongoUsuarios();

export {
    MongoUserController
}