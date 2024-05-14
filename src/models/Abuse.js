const mongoose = require("mongoose");
const { Schema } = mongoose;


const AbuseSchema = new Schema({
  id: { type: Number, required: true },
  abuse: { type: String, required: true }
});


module.exports = mongoose.model("Abuse", AbuseSchema);