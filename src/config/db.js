const mongoose = require("mongoose");
const conect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("conexion exitosa");
  } catch (error) {
    console.error("Error al conectar a la db", error.message);
  }
};
module.exports = conect;
