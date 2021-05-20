const db = require('../database/models')
const Producto = db.Producto
const Comentario = db.Comentario
const Usuario = db.Usuario
const Op = db.Sequelize.Op;



const usersController = {
    register: function(req,res){
        return res.render('register', {title: 'Creá tu cuenta'})
    },
    store: function(req,res){
        //1) Obtener datos del formulario
        let data = req.body;

        // 2) Armar usuario
        let usuario = {
            id: data.id,
            nombre: data.nombre,
            apellido: data.apellido,
            mail: data.mail,
            nacimiento: data.nacimiento,
            dni: data.dni,
            celular: data.celular,
            contrasenia: data.contrasenia,
            /* imagen: data.imagen,
            productos: data.productos,
            seguidores: data.seguidores,
            comentarios: data.comentarios */
        }

        // 3) Guardar perfume
        db.Usuario.create(usuario)
        return res.redirect('/')
    },
    logIn: function(req,res){
        return res.render ('logIn', {title: 'Iniciá sesión'})
    }, 
    editProfile: function(req,res){
        return res.render('editProfile', {title: 'Editar mi perfil'})
    },
    storeEdit: function(req,res){
        return res.redirect('/')
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