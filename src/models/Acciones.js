const mongoose = require("mongoose");
const { Schema } = mongoose;

//datos que vamos a guardar
const AccionesSchema = new Schema({
  contacto: { type: String, required: true },
  accion: { type: String, required: true },
  fecha: { type: String, required: true },
});

module.exports = mongoose.model("acciones", AccionesSchema);
