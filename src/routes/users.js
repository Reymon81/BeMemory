const express = require('express');
const router = express.Router(); 

const User = require('../models/User');

const passport = require('passport');

//direccion para pagina de desconectarse
router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//direccion para pagina de conectarse
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

//direccion para pagina de darse de alta
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

//autenticacion al introducir nick y password 
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '../home',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

//se reciben los datos del formulario de alta 
router.post('/users/signup', async (req, res) => {
      
    const {nick, email,password,confirm_password} = req.body;
    const errors = [];

    //se comprueban que los datos estan rellenos
    if(nick.length < 1){
        errors.push({text: 'por favor inserte un nick'});         
    }

    if(email.length < 1){
        errors.push({text: 'por favor inserte un email'});
    }

    //comprobamos que las contraseñas sean iguales
    if(password != confirm_password){
        errors.push({text: 'las contraseñas no coinciden'});
    }
    if(password.length < 4){
        errors.push({text: 'la contraseña debe ser mayor de 3 digitos'})
    }
    //si hay errores se reenvian a la pagina junto a los datos
    if(errors.length > 0){
        res.render('users/signup', {errors, nick, email, password, confirm_password});        
    }else{
        //controlamos que el nick no este dado de alta
        const nickUser = await User.findOne({nick: nick});

        if(nickUser){ 
            //si el nick existe en la bd mostramos que esta registrado y redirigimos a signup
            req.flash('error', 'Este nick ya esta registrado');
            res.redirect('/users/signup');
                       
        }else{
           const correo = await User.findOne({email: email})
           if(correo){
               req.flash('error', 'Este mail ya se ha utilizado para otro usuario');
               res.redirect('/users/signup');
           }else{
                const newUser = new User({ nick, email, password });
                //encriptamos la password
                newUser.password = await newUser.encryptPassword(password);
                //guardamos el usuario con la password encriptada
                await newUser.save();
                //mostramos aviso que se ha registrado correctamente y redirigimos a signin
                req.flash("success_msg", "Te has registrado correctamente");
                res.redirect("/users/signin");
           }
        }
    }
});

module.exports = router;