import userDTO, { asDto } from '../dto/user-dto.js';
import {getDaoUser} from "../daos/factory.js"


const dao = getDaoUser();

export const getAll = async () => {
    const carritos = await dao.getAllUser();
    const carritosDTO = asDto(carritos);
    return carritosDTO
}
