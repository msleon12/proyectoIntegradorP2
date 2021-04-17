const { comentarios, perfumes } = require('../data/info')
const products = require('../data/info')

const usersController = {
    register: function(req,res){
        return res.render('users', {title: 'Creá tu cuenta'})
    },
    logIn: function(req,res){
        return res.render ('users', {title: 'Iniciá sesión'})
    }, 
    editProfile: function(req,res){
        return res.render('users', {title: 'Editar mi perfil'})
    },
    myProfile: function(req,res){
        return res.render ('myProfile', {title: 'Mi perfil', comentarios: products.comentarios, products: products.perfumes})
    },

}

module.exports = usersController