const helpers = { };

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'debe loguearse para poder acceder a esa pagina');
    res.redirect('/users/signin');
};

module.exports = helpers;