export default class mensajesDTO {
    constructor({ _id, author, time, text}) {
        this.id = _id;
        this.author = author;
        this.text = text;
        this.time = time;
    }
}

export function asDto(prods) {
    if(Array.isArray(prods))
        return prods.map(p => new mensajesDTO(p))
    else
        return new mensajesDTO(prods)
}