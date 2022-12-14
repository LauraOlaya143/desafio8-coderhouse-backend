import express from "express";
import http from "http";
import { initWsServer } from "./socket"
import rutaPrincipal from "../routes/index"
import { engine } from 'express-handlebars'
import path from "path"
import { ProductosController } from "../controller/productos"
import { messageController } from "../controller/mensajes"
import morgan from "morgan";
import {faker} from "@faker-js/faker"
import moment from "moment"
import { v4 as uuidv4 } from 'uuid';
import { normalizado, desnormalizar } from "../controller/normalizado.js"
import cookieParser from "cookie-parser"
import session from 'express-session';
import MongoStore from 'connect-mongo';

faker.locale = "es"

const viewsFolderPath = path.resolve(__dirname, '../../views');
const layoutsFolderPath = `${viewsFolderPath}/layouts`
const layoutPorDefecto = `${layoutsFolderPath}/index.hbs`
const partialsFolderPath = `${viewsFolderPath}/partials`

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"))

app.use(morgan("dev"));

/* Views creadas con hbs:*/

app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);

app.engine('hbs', engine({
    layoutsDir: layoutsFolderPath,
    extname: "hbs",
    defaultLayout: layoutPorDefecto,
    partialsDir: partialsFolderPath
}
));

const mySecret = "mySecret"
app.use(cookieParser(mySecret));

const ttlSeconds = 180;

const connection = process.env.MONGO_ATLAS || "mongodb://localhost:27017/coderhouse" 

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: connection,
        crypto: {
            secret: '1234',     
        },
    }),
    secret: 'secretString', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlSeconds * 1000,
    },
};

app.use(session(StoreOptions))

const users = [
    {
        username: 'juan',
        password : '1234',
        admin: true,
    },
    {
        username: 'jose',
        password : '123456',
        admin: false,
    }
]

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const index = users.findIndex((user) => user.username === username && user.password === password)

    console.log(index);

    const data = await ProductosController.getAll()
    const cantidadObjetos = data.length
    const validarArray = cantidadObjetos > 0 ? true : false

    let respuesta = []

    for (let i = 0; i < data.length; i++) {
        respuesta.push({
            id: data[i]._id,
            title: data[i].title,
            price: data[i].price,
            thumbnail: data[i].thumbnail,
            timestamp: data[i].timestamp,
            descripcion: data[i].descripcion,
            codigo: data[i].codigo,
            stock: data[i].stock
        })
        
    }

    if(index < 0) {
        res.status(401).json({msg: "No estas autorizado :c"});
    } else {
        const user = users[index];
        req.session.info = {
            username: user.username,
            loggedIn: true,
            contador: 1,
            admin: user.admin,
        }

        res.render("main", { nombre: user.username, productos: respuesta, cantidad: validarArray})
    }
})

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.render("loginDespedida")
});

app.get("/login", (req, res) => {
    res.render("loginHbs")
})

app.get("/", async (req, res) => {
    const data = await ProductosController.getAll()
    const cantidadObjetos = data.length
    const validarArray = cantidadObjetos > 0 ? true : false

    let respuesta = []

    for (let i = 0; i < data.length; i++) {
        respuesta.push({
            id: data[i]._id,
            title: data[i].title,
            price: data[i].price,
            thumbnail: data[i].thumbnail,
            timestamp: data[i].timestamp,
            descripcion: data[i].descripcion,
            codigo: data[i].codigo,
            stock: data[i].stock
        })
        
    }

    res.render("main", { productos: respuesta, cantidad: validarArray})
})

app.get("/productos", async (req, res) => {
    const data = await ProductosController.getAll()
    let respuesta = []
    for (let i = 0; i < data.length; i++) {
        respuesta.push({
            id: data[i]._id,
            title: data[i].title,
            price: data[i].price,
            thumbnail: data[i].thumbnail,
            timestamp: data[i].timestamp,
            descripcion: data[i].descripcion,
            codigo: data[i].codigo,
            stock: data[i].stock
        })
        
    }
    const cantidadObjetos = data.length
    const validarArray = cantidadObjetos > 0 ? true : false
    res.render("showProducts", { productos: respuesta, cantidad: validarArray})
})

app.get("/productos-test", async (req, res) => {
    let respuesta = [];
    for (let i = 0; i < 5; i++) {
        const time = moment().format("DD-MM-YYYY HH:MM:SS");
        const newCodigo = uuidv4();
        const newStock = faker.random.numeric(3);

        const newStockNumber = Math.floor(newStock)

        respuesta.push({
            id: faker.database.mongodbObjectId(),
            title: faker.commerce.product(),
            price: faker.commerce.price(100, 200, 0, '$'),
            thumbnail: faker.image.animals(1234, 2345, true),
            timestamp: time,
            descripcion: faker.commerce.productDescription(),
            codigo: newCodigo,
            stock: newStockNumber
        })
    }

    const cantidadObjetos = respuesta.length
    const validarArray = cantidadObjetos > 0 ? true : false

    res.render("showProducts", { productos: respuesta, cantidad: validarArray})
})

app.get("/formulario", (req, res) => {
    res.render("formularioHbs")
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
        const message = err.message || "internal server error";

        console.log(err.stack)

        res.status(status).json(
            {
                message
            }
        )
})

app.use("/api", rutaPrincipal)

app.get("/mensajes", async (req, res) => {
    const controller = await messageController.getAll()
    res.json({
        data : controller
    })
})

app.post("/mensajes", async (req, res) => {
    const {email, nombre, apellido, edad, alias, avatar, text} = req.body

    const edadNum = Math.floor(edad)

    const objetoUsuario = {
        email,
        nombre,
        apellido,
        edad: edadNum,
        alias,
        avatar
    }

    const newMensaje = {
        author: objetoUsuario,
        text
    }

    const controller = await messageController.saveNewMessage(newMensaje)

    res.json({
        data: controller
    })
})

app.get("/mensajes-normalizados", async (req, res) => {
    const data = await normalizado();
    res.json({
        data
    })
})

app.get("/mensajes-desnormalizados", async (req, res) => {
    const data = await desnormalizar();
    res.json({
        data
    })
})

const myServer = http.Server(app)

initWsServer(myServer)

export default myServer;