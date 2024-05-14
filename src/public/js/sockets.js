//socket del servidor

const Abuses = require("../../models/Abuse");
const MessagesConversaciones = require("../../models/Conversaciones");
const MessagesReuniones = require("../../models/Reuniones");
const MessagesAcciones = require("../../models/Acciones");
const sessionHelper = require("../../helpers/session");

//rooms contiene un array por chat donde se guardaran los usuarios conectados
const rooms = {
  conversaciones: [],
  reuniones: [],
  acciones: [],
};

//funcion para añadir un usuario a una sala determinada
function addUserToRoom(userName, roomName) {
  rooms[roomName].push(userName);
}

//funcion para eliminar un usuario de una sala determinada
function removeUserToRoom(userName, roomName) {
  //devuelve un booleano, si es true lo deja como estaba, si es false borra el usuario del array
  rooms[roomName] = rooms[roomName].filter((item) => item !== userName);
}

//recorro una palabra y sustituyo cada caracter por *
const hideBadWord = (badWord) => {
  let word = "";
  for (let i = 0; i < badWord.length; i++) {
    word += "*";
  }
  return word;
};

//leo el mensaje del cliente y comparo las palabras con la de la lista de insultos de bd
//si alguna palabra coincide la sustituyo por los asteriscos
const filteredMessage = async (data) => {
  const abuses = await Abuses.find({});
  const messageFiltered = abuses.reduce((acum, abuse) => {
    abuse = abuse.abuse.toLowerCase();
    return acum.replaceAll(abuse, hideBadWord(abuse));
  }, data.message);
  data.message = messageFiltered;
  return data;
};

//conexion de socket del servidor
module.exports = function (io) {
  io.on("connection", (socket) => {
    let user;

    //conversaciones
    socket.on("send message", async function (data) {
      //filtro el mensaje para que no haya palabras malsonantes
      data = await filteredMessage(data);
      //creo un nuevo mensaje para guardarlo en una lista de mongodb
      message = new MessagesConversaciones(data);
      try {
        //guardo el mensaje y el nick en la lista del chat mongodb
        await message.save();
        //envio el mensaje recibido a todos los clientes
        io.sockets.emit("new message", data);
      } catch (error) {
        console.log(error);
      }
    });

    //reuniones
    socket.on("send message-doctor", async function (data) {
      data = await filteredMessage(data);
      message = new MessagesReuniones(data);
      try {
        await message.save();
        io.sockets.emit("new message-doctor", data);
      } catch (error) {
        console.log(error);
      }
    });

    //temas
    socket.on("send message-kimetsu", async function (data) {
      data = await filteredMessage(data);
      message = new MessagesAcciones(data);
      try {
        await message.save();
        io.sockets.emit("new message-kimetsu", data);
      } catch (error) {
        console.log(error);
      }
    });


    //////////// CONEXIONES Y DESCONEXIONES //////////////

    socket.on("client connect", function (data) {
      if (data.channel) {
        console.log("client connect");
        user = data;
        addUserToRoom(data.nick, data.channel);
        io.sockets.emit("refresh channel", rooms);
        io.sockets.emit("new client connect", data);
      }
    });

    socket.on("disconnect", function () {
      if (user?.nick && user?.channel) {
        removeUserToRoom(user.nick, user.channel);
        io.sockets.emit("refresh channel", rooms);
        io.sockets.emit("client disconnect", user);
      }
    });

    socket.on("send bye bye", function (data) {
      console.log("send bye bye", data);
      sessionHelper.desactivateSession(data.nick);
      console.log(data.nick, "ha realizado un logout");
      io.sockets.emit("bye bye", data);
    });
  });
};
