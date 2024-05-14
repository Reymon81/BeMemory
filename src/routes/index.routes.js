const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require("../helpers/auth");

//ficheros para guardar en base de datos
const Conversacion = require('../models/Conversaciones.js');
const Accion = require('../models/Acciones.js');
const Reunion = require('../models/Reuniones.js');
const Contacto = require('../models/Contactos.js');

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

const roomList = [
  "conversaciones",
  "reuniones",
  "acciones",
  "contactos"
];

router.get("/home/:roomId", isAuthenticated, (req, res) => {
  
  const roomId = req.params.roomId;
  const params = { user: JSON.stringify(req.user), nick: req.user?.nick };
  
  if(!roomList.includes(roomId)){
    res.redirect("/");
  }
  res.render("home/" + roomId, params);
  
});

router.post('/home/conversaciones', async (req) => {

  const {nombre, conversacion} = req.body;

  const newConversacion = new Conversacion({nombre, conversacion});

  await newConversacion.save();
  
});

router.post('/home/acciones', async (req) => {

  const {contacto, accion, fecha} = req.body;

  const newAccion = new Accion({contacto, accion, fecha});

  await newAccion.save();
  
});

router.post('/home/reuniones', async (req) => {

  const {asunto, contactos, fecha, hora} = req.body;

  const newReunion = new Reunion({asunto, contactos, fecha, hora});

  await newReunion.save();
  
});

router.post('/home/contactos', async (req) => {

  const {nombre, apellidos, mail} = req.body;

  const newContacto = new Contacto({nombre, apellidos, mail});

  await newContacto.save();
  
});

module.exports = router;
