const passport = require('passport');
const sessionHelper = require("../helpers/session") ;

//passport-local para iniciar sesion desde twitter, facebook, etc...
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User');


passport.use(new localStrategy({
    usernameField: 'nick',
    passwordField: 'password'
}, async (nick, password, done) => {  
    
    //busco si existe ese nick en la base de datos
    const user = await User.findOne({nick});
    
    if(!user) {
        return done(null, false, {message: 'El usuario no existe'});
    }else{
        const match = await user.matchPassword(password);
        if(match) {
            
            /*if(user.connected === true){                
                 return done(null, false, { message: "El usuario esta conectado" });
            }else{
                
                // user.connected = true;
                // await user.save();
                sessionHelper.activateSession(nick);
                return done(null, user);
            }*/

            sessionHelper.activateSession(nick);
            return done(null, user);
            
        }else{
            return done(null, false, {message: 'Password incorrecta'});
        }
    }
}));

//si el usuario se loguea se guarda en el id de sesion
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//tomamos los datos del usuario a través del id
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
        
    });    
});