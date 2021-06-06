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
        if(req.body.nombre == ""){
            errors.message = "El nombre es obligatorio.";
            res.locals.errors = errors;
            return res.render('register', {title: 'Creá tu cuenta'})

        } else if(req.body.apellido == ""){
            errors.message = "El apellido es obligatorio.";
            res.locals.errors = errors;
            return res.render('register', {title: 'Creá tu cuenta'})

        } else if(req.body.nacimiento == ""){
            errors.message = "La fecha de nacimiento es obligatoria.";
            res.locals.errors = errors;
            return res.render('register', {title: 'Creá tu cuenta'})

        } else if(req.body.email == ""){
            errors.message = "El email es obligatorio.";
            res.locals.errors = errors;
            return res.render('register', {title: 'Creá tu cuenta'})

        } else if (req.body.contrasenia == "") {
            errors.message = "La contraseña es obligatoria.";
            res.locals.errors = errors;
            return res.render('register', {title: 'Creá tu cuenta'})
        } else{

            // Busco el usuario para hacer validaciones
            Usuario.findOne({
                where: {email: req.body.email}
            })
                .then(function(user){
                // Si el find encontró un usuario significa que esta en uno ese email. Entonces, devolver un error
                    if(user != null){
                        errors.message = "El email ya está registrado. Por favor, elija otro."
                        res.locals.errors = errors
                        return res.render ('register', {title: 'Creá tu cuenta'})
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

                         // 3) Guardar usuario
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
        
    }, //Login
    logInSession: function(req,res){
        // Busco el usuario que se quiere loguear
        Usuario.findOne({
            where:[{email: req.body.email}] 
        }) //Find One
        .then(user=>{
            let errors = {};

            if (user == null){
                // Creo el mensaje de error
                errors.message = "El email no existe." 

                // Paso el mensaje a la vista
                res.locals.errors = errors

                // Renderizo 
                return res.render('logIn', {title: 'Iniciá sesión'})
            } // IF
            else if(bcrypt.compareSync(req.body.password, user.contrasenia)== false){

                // Creo el mensaje de error
                errors.message = "La contraseña es incorrecta." 

                // Paso el mensaje a la vista
                res.locals.errors = errors

                // Renderizo 
                return res.render('logIn', {title: 'Iniciá sesión'})
            } //ELSE IF
            else{
                req.session.user = user

                // Si tildo recordame creamos la cookie
                if (req.body.rememberme != undefined){
                        res.cookie('userId', user.id, {maxAge: 1000 * 60 * 5})
                } // If

                return res.redirect('/')

            } //ELSE
        }) //THEN
        .catch(error =>{
            console.log(error)
        })
     
    }, //Loginsession 
    logout: function(req,res){
        //Destruir la sessión
        req.session.destroy()

        //Si hay cookie, anularla
        res.clearCookie('userId')
        
        //Redireccionar
        res.redirect('/')
    },
    myProfile: function(req,res){
        let id = req.params.id

        if(req.session.user){
            if(req.session.user.id = id){
                Usuario.findByPk(id, {include: [
                        //relación comentario producto.
                        { association:'comentario'},
                    // relación producto usuario                                
                        { association: 'producto' }
                    ]
                })
                    .then(data =>{
                        if(data == null){
                            return res.redirect('/')
                        } else{
                            return res.render('myProfile', { title: 'Mi perfil', resultado: data}) 
                        }
                        
                    }) //Then
                    .catch(error =>{
                        console.log(error)
                    })
            } /* if */
        } /* if */ else{
            return res.redirect('/users/login')
        }
    }, //MYPROFILE
    editProfile: function(req,res){
        let id = req.params.id

        if(req.session.user){
            if(req.session.user.id = id){
                Usuario.findByPk(id, {include: [
                        //relación comentario producto.
                        { association:'comentario'},
                    // relación producto usuario                                
                        { association: 'producto' }
                    ]
                })
                    .then(data =>{
                        if(data == null){
                            return res.redirect('/')
                        } else{
                            return res.render('editProfile', { title: 'Editar mi perfil', resultado: data, usuario: Usuario}) 
                        }
                        
                    }) //Then
                    .catch(error =>{
                        console.log(error)
                    })
            } /* if */
        } /* if */ else {
            return res.redirect('/users/login')
        }


        /* return res.render('editProfile', {title: 'Editar mi perfil', usuario: Usuario}) */
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