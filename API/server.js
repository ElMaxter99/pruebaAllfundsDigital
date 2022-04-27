// importando dependencias
const express = require("express");
const mongoose = require('mongoose');
const routes = require('./routes');
const { error404Handler } = require("./middleware");
const cors = require("cors")
const app = express();

// Usar var de entorno del ".env"
require("dotenv/config")

// Body parsing
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Cors (Faltaria personalizar para que no sea global)
app.use(cors())

// Rutas
app.use('/v1', routes);

// catch 404 y otros errores
app.use(error404Handler);


// Cadena de conexion
var URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOSTNAME}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
// Abriendo la conexión a mongoDB Atlas
mongoose.connect(URI, OPTIONS, error => {
    // si algo sale mal mostramos el error y paramos el servidor
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log("Conexión establecida con MongoDB Altas");
    // Se inicia el servidor
    app.listen( process.env.APP_PORT||8000, error => {
        // En caso de error indicamos el problemas
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.log("Servidor listo");
    });
}
);


module.exports = app;