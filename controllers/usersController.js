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
            nombre: data.nombre,
            apellido: data.apellido,
            mail: data.mail,
            nacimiento: data.nacimiento,
            dni: data.dni,
            celular: data.celular,
            contrasenia: data.contrasenia, //Para que la contraseña aparezca encriptada
            /* imagen: data.imagen,
            productos: data.productos,
            seguidores: data.seguidores,
            comentarios: data.comentarios */
        }

        // 3) Guardar perfume
        db.Usuario.create(usuario)
        return res.redirect('/users/login')
    },
    logIn: function(req,res){
        return res.render ('logIn', {title: 'Iniciá sesión'})
    },
    logInSession: function(req,res){
        // Busco el usuario que se quiere loguear
       Usuario.findOne({
        where:[{mail: req.body.email}] //Le ponemos "mail" porque así lo tenemos en la tabla, pero en el modelo lo pasamos como "email"
        }) //Find One
        .then(user =>{
            req.session.user = user

            //Si tildo recordame, creamos la cookie
            if (req.body.rememberme != undefined){
                res.cookie('userId', user.id, {
                    maxAge: 1000 * 60 * 5
                })
            } // If
            return res.redirect ('/')
        })
        .catch(error =>{
            console.log(error)
        })
    }, //método 
    logout: function(req,res){
        //Destruir la sessión
        req.session.destroy()

        //Si hay cookie, anularla
        res.clearCookie('userId')
        
        //Redireccionar
        res.redirect('/')
    },
    editProfile: function(req,res){
        return res.render('editProfile', {title: 'Editar mi perfil', usuario: Usuario})
    },
    storeEdit: function(req,res){
        //1) Obtener datos del formulario
        let data = req.body;

        db.Usuario.update({
            nombre: data.nombre,
            apellido: data.apellido,
            mail: data.mail,
            nacimiento: data.nacimiento,
            dni: data.dni,
            celular: data.celular,
            contrasenia: data.contrasenia, //Para que la contraseña aparezca encriptada
            /* imagen: data.imagen,
            productos: data.productos,
            seguidores: data.seguidores,
            comentarios: data.comentarios */
        },{
            where: {
                id: Usuario.id
            }
        })
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
    destroy: function (req,res){
        let usuarioABorrar = req.params.id;
        //return res.redirect ('/');

        db.Usuario.destroy({
            where: [
                {id:usuarioABorrar}
            ]
        })

        //Destruir la sessión
        req.session.destroy()

        //Si hay cookie, anularla
        res.clearCookie('userId')

        return res.redirect ('/');
       

    }
} //Users controller

module.exports = usersController