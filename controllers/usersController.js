const db = require('../database/models')
const Producto = db.Producto
const Comentario = db.Comentario
const Usuario = db.Usuario
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
        Usuario.findByPk(id)
            .then(data =>{
                return res.render('myProfile', { title: 'Mi Perfil', resultado: data}) 
            }) //Then
            .catch(error =>{
                console.log(error)
            })


        // if(id < Usuario.length || id == Usuario.length){
        //     for(let i = 0; i< Usuario.length; i++){
        //         if(Usuario[i].id == id){
        //             resultado = Usuario[i]
        //         }
        //     }  
        // } // IF
        // else{
        //     return res.render('index', {title: "error2",  products: Producto})
        // }
        
    },

} //Users controller

module.exports = usersController