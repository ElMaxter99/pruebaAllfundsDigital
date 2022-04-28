// importando dependencias
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const app = express();

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: true,
  origins: ["*"],
});

// Usar var de entorno del ".env"
require("dotenv/config");

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors (Faltaria personalizar para que no sea global)
app.use(cors());

// Rutas
app.use("/v1", routes);

// catch 404 y otros errores

// Cadena de conexion
var URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOSTNAME}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

io.on("connection", (socket) => {
    console.log(socket.id);
  
    socket.on("/new-page", () => {
        console.log("/new-page----->"+socket.id);
        io.to("/new-page").emit("test", "testa")
        console.log("/new-page----->"+socket.id);
    });

    socket.on("/archived-page", ({ nombre }) => {
        console.log("/archived-page----->"+socket.id);
        io.to("/archived-page").emit("test", "testb")
        console.log("/archived-page----->"+socket.id);


    });

      socket.on("joinPage",({ pageName }) => {
          socket.join(pageName);
          console.log("El usuario "+socket.id+" esta subscrito a " + pageName);
      } )
  });

// Abriendo la conexión a mongoDB Atlas

mongoose.connect(URI, OPTIONS, (error) => {
  // si algo sale mal mostramos el error y paramos el servidor
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log("Conexión establecida con MongoDB Altas");
  // Se inicia el servidor
  httpServer.listen(process.env.APP_PORT || 8000, (error) => {
    // En caso de error indicamos el problemas
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log("Servidor listo");
  });
});

module.exports = app;
