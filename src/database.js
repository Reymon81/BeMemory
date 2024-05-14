const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/be-memory", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log("base de datos conectada"))
  .catch((err) => console.error(err));
