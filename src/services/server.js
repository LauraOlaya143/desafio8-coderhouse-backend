const express = require('express');
const rutaPrincipal = require('../routes/index')
const { engine } = require('express-handlebars');
const path = require('path');

const viewsFolderPath = path.resolve(__dirname, '../../views');
const layoutsFolderPath = `${viewsFolderPath}/layouts`
const layoutPorDefecto = `${layoutsFolderPath}/index.hbs`
const partialsFolderPath = `${viewsFolderPath}/partials`

const app = express();

app.use(express.static("public"))

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


/* Views creadas con Pug:

app.set('view engine', 'pug');
app.set('views', viewsFolderPath); */


/* Views creadas con EJS 

app.set('view engine', 'ejs');
app.set('views', viewsFolderPath);*/


app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

module.exports = app;