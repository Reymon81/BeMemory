//conexion de socket del cliente
$(function () {
  //obtengo toda la informacion del objeto usuario
  const userData = window.___DATA___;

  //abro sesion
  const socket = io();

  //le digo al servidor el usuario y la pagina donde se conecta
  socket.on("connect", function () {
    const data = {
      nick: userData.nick,
      //hago split porque la ruta esta compuesta y debo obtener lo que hay despues de la ultima /
      channel: window.location.pathname.split("/")[2],
    };
    console.log("connect data", data);
    socket.emit("client connect", data);
  });

  //se refresca la lista de usuarios que hay en el canal
  socket.on("refresh channel", function (rooms) {
    const channel = window.location.pathname.split("/")[2];
    refreshList(rooms[channel]);
  });

  // caja donde vamos a guardar los nicks
  const $usuarios = $("#usuarios");

  //obtiene una lista con los nicks de usuarios
  const getUsers = () =>
    [...$usuarios[0].querySelectorAll("strong")].map((el) =>
      el.textContent.trim()
    );

  const refreshList = (users) => {
    $usuarios.empty();

    users.map((user) => {
      const message = `<strong>${user}</strong><br/>`;
      $usuarios.append(message);
    });
  };

  //si es diferente el usuario de la sala ve como entra el nuevo
  socket.on("send connect saludo", function (data) {
    if (data.nick !== userData.nick) {
      addUser(data.nick);
    }
  });

  /* CLOSE SOCKET.IO SESION - INICIO */
  function LogoutSocket() {
    socket.emit("send bye bye", {
      nick: userData.nick,
      channel: window.location.pathname,
    });
    window.location.pathname = "/users/logout";
  }
  const linkLogout = document.getElementById("linkLogout");
  linkLogout.addEventListener("click", LogoutSocket);

  window.addEventListener("beforeunload", function (event) {
    //en algunos navegadores se utiliza event.returnValue para que funcione
    var confirmationMessage = "";
    event.preventDefault();
    event.returnValue = confirmationMessage;
    LogoutSocket();
    //en otros navegadores se devuelve una variable con return para que funcione (no funciona igual en todos los navegadores)
    return confirmationMessage;
  });
  /* CLOSE SOCKET.IO SESION - FINAL */
  
  socket.on("bye bye", function (data) {
    if (window.location.pathname === data.channel) {
      removeUser(data.nick);
    }
  });

  /////////// CONVERSACIONES //////////

  //obteniendo los datos de conversaciones
  const $messageForm = $("#message-form");
  const $messageBox = $("#message");
  const $chat = $("#chat");
  //obteniendo eventos conversaciones
  $messageForm.submit((e) => {
    //evito que se refresque la pantalla cuando se envian mensajes
    e.preventDefault();
    socket.emit("send message", {
      message: $messageBox.val(),
      nick: userData.nick,
    });

    //vaciamos la barra de texto para escribir un mensaje nuevo
    $messageBox.val("");
  });

  //el cliente recibe todos los mensajes que envia el servidor
  socket.on("new message", function (data) {
    const message = `<strong>${data.nick}: </strong> <span>${data.message}</span> <br/>`;
    $chat.append(message);
    //todos los elementos del dom de la clase chat asignandolos a un array
    const chats = [...document.getElementsByClassName("chat")];
    chats.forEach((chat) => {
      chat.scrollTop = chat.scrollHeight;
    });
  });

  //////////// REUNIONES ////////////

  //obteniendo los datos de reuniones
  const $messageFormDoctor = $("#message-form-doctor");
  const $messageBoxDoctor = $("#message-doctor");
  const $chatDoctor = $("#chat-doctor");

  //obteniendo eventos
  $messageFormDoctor.submit((e) => {
    //evito que se refresque la pantalla cuando se envian mensajes
    e.preventDefault();
    socket.emit("send message-doctor", {
      message: $messageBoxDoctor.val(),
      nick: userData.nick,
    });

    //vaciamos la barra de texto para escribir un mensaje nuevo
    $messageBoxDoctor.val("");
  });

  //el cliente recibe todos los mensajes que envia el servidor
  socket.on("new message-doctor", function (data) {
    const message = `<strong>${data.nick}: </strong> <span>${data.message}</span> <br/>`;
    $chatDoctor.append(message);
    const chats = [...document.getElementsByClassName("chat")];
    chats.forEach((chat) => {
      chat.scrollTop = chat.scrollHeight;
    });
  });

  ///////// TEMAS ////////////

  //obteniendo los datos de temas
  const $messageFormKimetsu = $("#message-form-kimetsu");
  const $messageBoxKimetsu = $("#message-kimetsu");
  const $chatKimetsu = $("#chat-kimetsu");

  //obteniendo eventos
  $messageFormKimetsu.submit((e) => {
    //evito que se refresque la pantalla cuando se envian mensajes
    e.preventDefault();
    socket.emit("send message-kimetsu", {
      message: $messageBoxKimetsu.val(),
      nick: userData.nick,
    });

    //vaciamos la barra de texto para escribir un mensaje nuevo
    $messageBoxKimetsu.val("");
  });

  //el cliente recibe todos los mensajes que envia el servidor
  socket.on("new message-kimetsu", function (data) {
    const message = `<strong>${data.nick}: </strong> <span>${data.message}</span> <br/>`;
    $chatKimetsu.append(message);
    const chats = [...document.getElementsByClassName("chat")];
    chats.forEach((chat) => {
      chat.scrollTop = chat.scrollHeight;
    });
  });
});
