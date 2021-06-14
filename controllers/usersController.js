const db = require('../database/models')
const bcrypt = require('bcryptjs')
const Producto = db.Producto
const Comentario = db.Comentario
const Usuario = db.Usuario
const Op = db.Sequelize.Op;

const usersController = {
    register: function (req, res) {
        if (req.session.user != undefined) {
            return res.redirect('/')
        }
        else {
            return res.render('register', { title: 'Creá tu cuenta' })
        }

    },
    store: function (req, res) {

        let errors = {}

        // Chequear que email venga con datos
        if (req.body.nombre == "") {
            errors.message = "El nombre es obligatorio.";
            res.locals.errors = errors;
            return res.render('register', { title: 'Creá tu cuenta' })

        } else if (req.body.apellido == "") {
            errors.message = "El apellido es obligatorio.";
            res.locals.errors = errors;
            return res.render('register', { title: 'Creá tu cuenta' })

        } else if (req.file != undefined && req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg') {
            errors.message = "Debe subir una imagen en formato jpg, jpeg o png.";
            res.locals.errors = errors;
            return res.render('register', { title: 'Creá tu cuenta' })

        } else if (req.body.nacimiento == "") {
            errors.message = "La fecha de nacimiento es obligatoria.";
            res.locals.errors = errors;
            return res.render('register', { title: 'Creá tu cuenta' })

        } else if (req.body.email == "") {
            errors.message = "El email es obligatorio.";
            res.locals.errors = errors;
            return res.render('register', { title: 'Creá tu cuenta' })

        } else if (req.body.contrasenia == "" || req.body.contrasenia.length < 3) {
            errors.message = "La contraseña es obligatoria y debe tener como mínimo 3 caracteres.";
            res.locals.errors = errors;
            return res.render('register', { title: 'Creá tu cuenta' })

        } else if (req.body.contrasenia != req.body.repetirContrasenia) {
            errors.message = "Repita la misma contraseña.";
            res.locals.errors = errors;
            return res.render('register', { title: 'Creá tu cuenta' })

        } else {
            // Busco el usuario para hacer validaciones
            Usuario.findOne({
                where: { email: req.body.email }
            })
                .then(function (user) {
                    // Si el find encontró un usuario significa que esta en uno ese email. Entonces, devolver un error
                    if (user != null) {
                        errors.message = "El email ya está registrado. Por favor, elija otro."
                        res.locals.errors = errors
                        return res.render('register', { title: 'Creá tu cuenta' })
                    } else {
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
                            imagen: req.file.filename,
                            seguidores: data.seguidores,

                        } // USUARIO

                        // 3) Guardar usuario
                        Usuario.create(usuario)
                        return res.redirect('/users/login')
                    } //Else
                }) // THEN
                .catch(error => {
                    console.log(error)
                })



        } // ELSE

    },
    logIn: function (req, res) {
        // Validacion
        if (req.session.user != undefined) {
            return res.redirect('/')
        }
        else {
            return res.render('logIn', { title: 'Iniciá sesión' })
        }

    }, //Login
    logInSession: function (req, res) {
        // Busco el usuario que se quiere loguear
        Usuario.findOne({
            where: [{ email: req.body.email }]
        }) //Find One
            .then(user => {
                let errors = {};

                if (user == null) {
                    // Creo el mensaje de error
                    errors.message = "El email no existe."

                    // Paso el mensaje a la vista
                    res.locals.errors = errors

                    // Renderizo 
                    return res.render('logIn', { title: 'Iniciá sesión' })
                } // IF
                else if (bcrypt.compareSync(req.body.password, user.contrasenia) == false) {

                    // Creo el mensaje de error
                    errors.message = "La contraseña es incorrecta."

                    // Paso el mensaje a la vista
                    res.locals.errors = errors

                    // Renderizo 
                    return res.render('logIn', { title: 'Iniciá sesión' })
                } //ELSE IF
                else {
                    req.session.user = user

                    // Si tildo recordame creamos la cookie
                    if (req.body.rememberme != undefined) {
                        res.cookie('userId', user.id, { maxAge: 1000 * 60 * 5 })
                    } // If

                    return res.redirect('/')

                } //ELSE
            }) //THEN
            .catch(error => {
                console.log(error)
            })

    }, //Loginsession 
    logout: function (req, res) {
        //Destruir la sessión
        req.session.destroy()

        //Si hay cookie, anularla
        res.clearCookie('userId')

        //Redireccionar
        res.redirect('/')
    },
    myProfile: function (req, res) {
        let id = req.params.id

        Usuario.findByPk(id, {
            include: [  //relación comentario producto.
                {
                    association: 'comentario',
                    include: { association: 'usuario' }
                },
                // relación producto usuario                                
                { association: 'producto' }
            ] // Include
        }) //Find by Pk
            .then(data => {
                if (data == null) {
                    return res.redirect('/')
                } else {
                    return res.render('myProfile', { title: 'Mi perfil', resultado: data })
                }

            }) //Then
            .catch(error => {
                console.log(error)
            })

    }, //MYPROFILE
    editProfile: function (req, res) {
        let id = req.params.id

        if (req.session.user) {

            if (id != req.session.user.id) {
                return res.redirect(`/users/editProfile/${req.session.user.id}`)
            }
            else {
                    Usuario.findByPk(id, {
                        include: [
                            //relación comentario producto.
                            { association: 'comentario' },
                            // relación producto usuario                                
                            { association: 'producto' }
                        ]
                    })
                        .then(data => {
                            if (data == null) {
                                return res.redirect('/')
                            } else {
                                return res.render('editProfile', { title: 'Editar mi perfil', resultado: data })
                            }

                        }) //Then
                        .catch(error => {
                            console.log(error)
                        })
            } /* if */
        } /* if Grande */ else {
            return res.redirect('/users/login')
        }


        /* return res.render('editProfile', {title: 'Editar mi perfil', usuario: Usuario}) */
    },

    storeEdit: function (req, res) {
        //1) Obtener datos del formulario
        let user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            nacimiento: req.body.nacimiento,
            dni: req.body.dni,
            celular: req.body.celular,
            contrasenia: '', //Para que la contraseña aparezca encriptada
            imagen: ''
        }
        if (req.body.contrasenia == ''){
                   user.contrasenia = req.session.user.contrasenia;
            } else {
                  user.contrasenia = bcrypt.hashSync(req.body.contrasenia, 10);
        }

        if (req.file == undefined || req.file == ""){
            user.imagen = req.session.user.imagen ;
        } else{
            user.imagen = req.file.filename;
        }

        Usuario.update(user, {
            where: {
                id: req.session.user.id
            }
        }) //update
            .then (function(id){
                user.id = req.session.user.id
                req.session.user = user 
                return res.redirect('/')
            })
            .catch (error =>{
                console.log(error)
            }) // Catch
         
    }, // Store edit
    destroy: function (req, res) {
        let usuarioABorrar = req.params.id;
        //return res.redirect ('/');

        db.Usuario.destroy({
            where: [
                { id: usuarioABorrar }
            ]
        })

        //Destruir la sessión
        req.session.destroy()

        //Si hay cookie, anularla
        res.clearCookie('userId')

        return res.redirect('/');

    },

} //Users controller

module.exports = usersController