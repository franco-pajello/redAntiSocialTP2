require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const conect = require("./config/db");

const init = require("./init");
const usuarioRoute = require("./routes/usuario.route");
const publicacionRoute = require("./routes/publicacion.route");
const comentarioRoute = require("./routes/comentario.route");
const tagRoute = require("./routes/tag.route");

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/usuario", usuarioRoute);
app.use("/publicacion", publicacionRoute);
app.use("/publicacion", comentarioRoute);
app.use("/tag", tagRoute);

app.listen(PORT, async (error) => {
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  await conect();
  await init();
  console.log(`App escuchando en http://localhost:${PORT}`);
  console.log(
    `Documentación de la API disponible en http://localhost:${PORT}/api-docs`,
  );
  console.log(`mongo-express en http://localhost:${8082}`);
});
