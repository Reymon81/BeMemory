const mongoose = require("mongoose");
const { Schema } = mongoose;

//datos que vamos a guardar
const ReunionesSchema = new Schema({
  //usuario: { type: String, required: true },
  asunto: { type: String, required: true },
  contactos: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true }
});

module.exports = mongoose.model("reuniones", ReunionesSchema);
