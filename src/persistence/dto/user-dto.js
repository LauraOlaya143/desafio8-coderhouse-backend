export default class userDTO {
    constructor({ username, email, direccion, foto}) {
        this.username = username;
        this.email = email;
        this.direccion = direccion;
        this.foto = foto;
    }
}

export function asDto(prods) {
    if(Array.isArray(prods))
        return prods.map(p => new userDTO(p))
    else
        return new userDTO(prods)
}