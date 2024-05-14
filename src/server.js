const http = require('http');
const path = require('path');
const exphbs = require('express-handlebars');
const express = require('express');
const socketio = require('socket.io');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');




//inicializaciones
const app = express();
const server = http.createServer(app);
const io = socketio(server);
require('./database');
require('./config/passport');
//llama a la funcion para conectar por sockets
require('./public/js/sockets')(io);

//configuraciones
app.set('port', 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//servicios y funciones comunes
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//variables globales
app.use((req, res, next) => {
  // si existe user.nick se guarda en user, si no devuelve null
  //const user = req.user ? {nick: req.user.nick} : null;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  //console.log(res.locals.user);
  next();
})

//rutas
app.use(require('./routes/index.routes')); 
app.use(require('./routes/chat'));
app.use(require('./routes/users'));

//enviar archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "..", "node_modules", "@farvell")));

//escuchando el servidor
server.listen(app.get('port'), () =>{
    console.log('server on port 3000');
});