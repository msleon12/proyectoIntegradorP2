const products = require('../data/info')

const usersController = {
    register: function(req,res){
        return res.render('users', {title: 'Crea tu cuenta'})
    },
    logIn: function(req,res){
        return res.render ('users', {title: 'Inicia Sesión'})
    }, 
    editProfile: function(req,res){
        return res.render('users', {title: 'Editar mi perfil'})
    },
    myProfile: function(req,res){
        return res.render ('myProfile', {title: 'Mi perfil'})
    },

}

module.exports = usersController