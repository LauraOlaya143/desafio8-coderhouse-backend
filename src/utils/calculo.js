import logger from "./logger.js"

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

export const calculo = (cantidad) => {
    let array = [];
    let repetidos = {};
    for (let i = 1; i <= cantidad; i++){
        const newNumber = random(1,1001);
        array.push(newNumber)
    }
    array.forEach(function(numero){
        repetidos[numero] = (repetidos[numero] || 0) + 1;
    });
    return repetidos;
}

process.on('message', (msg) => {
    if (msg == 'inicio') {
        logger.info(process.argv[2])
        let numero;
        if(isNaN(process.argv[2])){
            numero = 100000000
        } else {
            const number = parseFloat(process.argv[2])
            numero = number
        }
        logger.info(numero)
        logger.info(`Start calculo, PID: ${process.pid}`);
        const sum = calculo(numero);
        process.send(sum);
    }
});