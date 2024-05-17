const mongoose = require("mongoose");
const { Schema } = mongoose;

//datos que vamos a guardar
const ConversacionesSchema = new Schema({
  //usuario: { type: String, required: true },
  nombre: { type: String, required: true },
  conversacion: { type: String, required: true },
});

module.exports = mongoose.model("conversaciones", ConversacionesSchema);