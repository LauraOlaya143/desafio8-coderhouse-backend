import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const usuariosCollectionName = "usuarios"

const usuariosSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    admin: { type: Boolean, default: false}
})

usuariosSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

usuariosSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const usuariosModel = mongoose.model("user", usuariosSchema)


export {
    usuariosCollectionName,
    usuariosModel
}