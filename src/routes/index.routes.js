const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require("../helpers/auth");

//ficheros para guardar en base de datos
const Conversacion = require('../models/Conversaciones.js');
const Accion = require('../models/Acciones.js');
const Reunion = require('../models/Reuniones.js');
const Contacto = require('../models/Contactos.js');

// Definición de la lista de colecciones
const collectionList = {
  "conversaciones": Conversacion,
  "reuniones": Reunion,
  "acciones": Accion,
  "contactos": Contacto
};

const roomList = [
  "conversaciones",
  "reuniones",
  "acciones",
  "contactos"
];

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});



router.get("/home/:roomId", isAuthenticated, async(req, res) => {
  
  const roomId = req.params.roomId;

  if(!roomList.includes(roomId)){
    res.redirect("/");
  }
  try {
    const collectionData = await collectionList[roomId].find().lean();
    
    console.log(collectionData);

    const params = { 
      user: JSON.stringify(req.user), 
      nick: req.user?.nick, 
      collectionData 
    };
  
    res.render("home/" + roomId, params);
  } catch(error) {
    console.error("Error al consultar la colección:", error);
    res.status(500).send("Error interno del servidor");
  }
  
});

router.post('/home/conversaciones', async (req, res) => {

  const {nombre, conversacion} = req.body;

  // Obtener el nick del usuario autenticado
  //const usuario = req.user.nick;

  const newConversacion = new Conversacion({nombre, conversacion});

  await newConversacion.save();

  const collectionData = await Conversacion.find();

  res.redirect('/home/conversaciones');
  
});

router.post('/home/acciones', async (req, res) => {

  const {contacto, accion, fecha} = req.body;
  // Obtener el nick del usuario autenticado
  //const usuario = req.user.nick;

  const newAccion = new Accion({contacto, accion, fecha});

  await newAccion.save();

  const collectionData = await Accion.find();

  res.redirect('/home/acciones');
  
});

router.post('/home/reuniones', async (req, res) => {

  const {asunto, contactos, fecha, hora} = req.body;

   // Obtener el nick del usuario autenticado
  //const usuario = req.user.nick;

  const newReunion = new Reunion({asunto, contactos, fecha, hora});

  await newReunion.save();

  const collectionData = await Reunion.find();

  res.redirect('/home/reuniones');
  
});

router.post('/home/contactos', async (req, res) => {

  const {nombre, apellidos, mail} = req.body;

  // Obtener el nick del usuario autenticado
  //const usuario = req.user.nick;

  const newContacto = new Contacto({nombre, apellidos, mail});

  await newContacto.save();

  const collectionData = await Contacto.find();

  res.redirect('/home/contactos');
  
});

module.exports = router;
