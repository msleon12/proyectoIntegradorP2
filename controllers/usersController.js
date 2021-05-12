const db = require('../database/models')
const Producto = db.Producto
const Comentario = db.Comentario
const Op = db.Sequelize.Op;


const usersController = {
    register: function(req,res){
        return res.render('register', {title: 'Creá tu cuenta'})
    },
    logIn: function(req,res){
        return res.render ('logIn', {title: 'Iniciá sesión'})
    }, 
    editProfile: function(req,res){
        return res.render('editProfile', {title: 'Editar mi perfil'})
    },
    myProfile: function(req,res){
        let id = req.params.id
        let resultado = ""
        if(id < Comentario.length || id == Comentario.length){
            for(let i = 0; i< Comentario.length; i++){
                if(Comentario[i].id == id){
                    resultado = Comentario[i]
                    return res.render('myProfile', { title: 'Mi Perfil', resultado: resultado, products: Producto})
                }
            }  
        } // IF
        else{
            return res.render('index', {title: "error2",  products: Producto})
        }
        
    },

} //Users controller

module.exports = usersController