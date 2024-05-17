const mongoose = require("mongoose");
const { Schema } = mongoose;

//datos que vamos a guardar
const ContactosSchema = new Schema({
  //usuario: { type: String, required: true },
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  mail: { type: String, required: true }
});

module.exports = mongoose.model("contactos", ContactosSchema);