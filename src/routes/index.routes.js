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

    const usuario = req.user?.nick;

    //consultamos todos los registros de la coleccion mongodb asociados al usuario en la seccion que nos encontramos 
    const collectionData = await collectionList[roomId].find({ usuario }).lean();
    
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

//se agrega una conversacion a la bd
router.post('/home/conversaciones', isAuthenticated, async (req, res) => {

  const {nombre, conversacion} = req.body;

  // Obtener el nick del usuario autenticado
  const usuario = req.user?.nick;
  
  // Se crea una nueva conversacion
  const newConversacion = new Conversacion({usuario, nombre, conversacion});

  // Se guarda la conversacion en mongo
  await newConversacion.save();

  res.redirect('/home/conversaciones');
  
});

//se elimina una conversacion de la bd
router.post('/eliminarConversacion', async (req, res) => {
  try {
      const conversacionId = req.body.conversacionId;
      await Conversacion.findByIdAndRemove(conversacionId);
      res.redirect('/home/conversaciones');
  } catch (error) {
      console.error("Error al eliminar la conversación:", error);
      res.status(500).send("Error interno del servidor");
  }
});

//se agrega una accion a la base de datos
router.post('/home/acciones', isAuthenticated, async (req, res) => {

  const {contacto, accion, fecha} = req.body;
  // Obtener el nick del usuario autenticado
  const usuario = req.user?.nick;
  
  const newAccion = new Accion({usuario, contacto, accion, fecha});

  await newAccion.save();

  res.redirect('/home/acciones');
  
});

//se elimina una accion en la bd
router.post('/eliminarAccion', isAuthenticated, async (req, res) => {
  try {
      const accionId = req.body.accionId;
      await Accion.findByIdAndRemove(accionId);
      res.redirect('/home/acciones');
  } catch (error) {
      console.error("Error al eliminar la acción:", error);
      res.status(500).send("Error interno del servidor");
  }
});

//se agrega una reunion a la bd
router.post('/home/reuniones', isAuthenticated, async (req, res) => {

  const {asunto, contactos, fecha, hora} = req.body;

   // Obtener el nick del usuario autenticado
  const usuario = req.user?.nick;
  
  const newReunion = new Reunion({usuario, asunto, contactos, fecha, hora});

  await newReunion.save();

  res.redirect('/home/reuniones');
  
});

//se elimina una reunion en la bd
router.post('/eliminarReunion', isAuthenticated, async (req, res) => {
  try {
      const reunionId = req.body.reunionId;
      await Reunion.findByIdAndRemove(reunionId);
      res.redirect('/home/reuniones');
  } catch (error) {
      console.error("Error al eliminar una reunion:", error);
      res.status(500).send("Error interno del servidor");
  }
});

//se agrega un contacto a la bd
router.post('/home/contactos', isAuthenticated, async (req, res) => {

  const {nombre, apellidos, mail} = req.body;

  // Obtener el nick del usuario autenticado
  const usuario = req.user?.nick;
  
  const newContacto = new Contacto({usuario, nombre, apellidos, mail});

  await newContacto.save();

  res.redirect('/home/contactos');
  
});

//se elimina un contacto en la bd
router.post('/eliminarContacto', isAuthenticated, async (req, res) => {
  try {
      const contactoId = req.body.contactoId;
      await Contacto.findByIdAndRemove(contactoId);
      res.redirect('/home/contactos');
  } catch (error) {
      console.error("Error al eliminar el contacto:", error);
      res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
