const db = require('../database/models')
const bcrypt = require('bcryptjs')
const Producto = db.Producto
const Comentario = db.Comentario
const Usuario = db.Usuario
const Op = db.Sequelize.Op;

const usersController = {
    register: function(req,res){
        if(req.session.user != undefined){
            return res.redirect('/')
        }
        else{
            return res.render('register', {title: 'Creá tu cuenta'})
        }
        
    },
    store: function(req,res){

        let errors = {}

        // Chequear que email venga con datos
        if(req.body.email == ""){
            errors.message = "El email es obligatorio";
            res.locals.errors = errors;
            return res.render('register')

        } else if (req.body.password == "") {
            errors.message = "La contraseña es obligatoria";
            res.locals.errors = errors;
            return res.render('register')
        } else{

            // Busco el usuario para hacer validaciones
            Usuario.findOne({
                where: [{email:req.body.email}]
            })
                .then(function(user){
                // Si el find encontró un usuario significa que esta en uno ese email. Entonces, devolver un error
                    if(user != null){
                        errors.message = "El email ya esta registrado. por favor elija otro."
                        res.locals.error = errors
                        return res.render ('register')
                    } else{
                        //1) Obtener datos del formulario
                        let data = req.body;

                        // 1.1 Hashear contraseña
                        let passEncriptada = bcrypt.hashSync(data.contrasenia, 10)

                        // 2) Armar usuario
                        let usuario = {
                            nombre: data.nombre,
                            apellido: data.apellido,
                            email: data.email,
                            nacimiento: data.nacimiento,
                            dni: data.dni,
                            celular: data.celular,
                            contrasenia: passEncriptada, //Para que la contraseña aparezca encriptada
                            /* imagen: data.imagen, 
                            productos: data.productos,
                            seguidores: data.seguidores,
                            comentarios: data.comentarios */
                        } // USUARIO

                         // 3) Guardar perfume
                            Usuario.create(usuario)
                            return res.redirect('/users/login')
                    } //Else
                }) // THEN
                .catch(error =>{
                    console.log(error)
                })
            

           
        } // ELSE
       
    },
    logIn: function(req,res){
        // Validacion
        if(req.session.user != undefined){
            return res.redirect('/')
        }
        else{
            return res.render ('logIn', {title: 'Iniciá sesión'})
        }
        
    },
    logInSession: function(req,res){
        // Busco el usuario que se quiere loguear
       Usuario.findOne({
        where:[{email: req.body.email}] 
        }) //Find One
        .then(user =>{
            /* let errors = {};

            // Esta el email en la base de datos?
            if (user == null){
                //Crear un mensaje de error 
                errors.message = "El email no existe."

                // Pasar el mensaje a la vista
                res.locals.errors = errors

                // Renderizar vista
                return res.render('login')
            } else if (bcrypt.compareSync(req.body.password, user.password) ==false ){ //Estoy comparando la contraseña, devuelve true o false
                errors.message = "La contraseña es incorrecta."

                res.locals.errors = errors

                return res.render('login')
            } // Else if
            else{ */
                req.session.user = user

                //Si tildo recordame, creamos la cookie
                if (req.body.rememberme != undefined){
                    res.cookie('userId', user.id, {
                        maxAge: 1000 * 60 * 5
                    })
                } // If
                return res.redirect ('/')
            //}
            
        }) //.then 
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
            email: data.email,
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
        Usuario.findByPk(id)
            .then(data =>{
                if(data == null){
                    return res.redirect('/')
                } else{
                    return res.render('myProfile', { title: 'Mi Perfil', resultado: data}) 
                }
                
            }) //Then
            .catch(error =>{
                console.log(error)
            })      
    }, //MYPROFILE
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