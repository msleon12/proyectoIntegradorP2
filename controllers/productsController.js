const db = require('../database/models')
const Usuario = db.Usuario
const Producto = db.Producto;
const Comentario = db.Comentario;
const Op = db.Sequelize.Op;

const productsController = {
    products: function (req, res) {
        Producto.findAll()
            .then(data => {
                return res.render('index', { title: 'Index', products: data })
            }) //Then
            .catch(error => {
                console.log(error)
            }) // Catch
    },
    addProducts: function (req, res) {
        // Control de acceso 
        if (req.session.user == undefined) {
            return res.redirect('/users/login')
        }
        else {
            Producto.findAll()
                .then(data => {
                    return res.render('addProducts', { title: "Agregar productos", producto: data })
                })
                .catch(error => {
                    console.log(error)
                })
        }

    },
    store: function (req, res) { //Guardar un perfume

        let errors = {}

        if (req.body.nombre == "") {
            errors.message = "El nombre es obligatorio.";
            res.locals.errors = errors;
            return res.render('addProducts', { title: 'Agregar productos' })

        } else if (req.file == undefined) {
            errors.message = "La imagen es obligatoria.";
            res.locals.errors = errors;
            return res.render('addProducts', { title: 'Agregar productos' })

        } else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg') {
            errors.message = "Debe subir una imagen en formato jpg, jpeg o png.";
            res.locals.errors = errors;
            return res.render('register', { title: 'Agregar productos' })

        } else if (req.body.marca == "") {
            errors.message = "La marca es obligatoria.";
            res.locals.errors = errors;
            return res.render('addProducts', { title: 'Agregar productos' })

        } else if (req.body.ml == "") {
            errors.message = "La cantidad de mililitros es obligatoria.";
            res.locals.errors = errors;
            return res.render('addProducts', { title: 'Agregar productos' })

        } else {
            //1) Obtener datos del formulario
            let data = req.body;

            // 2) Armar perfume
            let perfume = {
                idUsuario: req.session.user.id,
                nombre: data.nombre,
                imagen: req.file.filename,
                fechaPublicacion: data.fechaPublicacion,
                marca: data.marca,
                ml: data.ml,
                anio: data.anio,
                descripcion: data.descripcion,
            }

            // 3) Guardar perfume
            Producto.create(perfume)
            return res.redirect('/')
        }

    }, //Store
    destroy: function (req, res) {
        let productoABorrar = req.params.id;
      
        Producto.findByPk(productoABorrar)
        .then(data =>{
            if(req.session.user.id == data.idUsuario){ 
                Comentario.destroy({
                    where: [
                        {idProducto: productoABorrar}
                    ] //where
                })
                .then( function(){
                    Producto.destroy({
                        where: [
                            { id: productoABorrar },
                        ],
                        include: [{association: 'comentario'}]
                    }) //Destroy
                }) // Then
                .then(function(){
                    return res.redirect('/');
                })
                .catch(error =>{
                    console.log(error)
                })
                
             } else {
                return res.redirect('/users/login')
            } // Else 
        }) // Then grande
        .catch(error =>{
            console.log(error)
        })
       

    },
    editProducts: function (req, res) {
        let productId = req.params.id;

        if(req.session.user){
            Producto.findByPk(productId)
                .then(data=>{
                    if(req.session.user.id == data.idUsuario){
                        return res.render('editProducts', { title: "Editar producto", resultado: data })
                    } else {
                        return res.redirect('/')
                    }
                })
                .catch(e => { console.log(e)
                    })
        } else {
            return res.redirect ('/users/login')
        }

    },
    update: function (req, res) {

        // El método ahora anda bien, pero para hacer que ande tuve que mandar el la info del id desde el ejs en e formulario. Para que no la ouedan modificar pero aún así aparezca en el req.body le puse un display none
        
        Producto.findByPk(req.body.id)
            .then(data =>{
                // Actualizar un producto
                let perfume = {
                    nombre: req.body.nombre,
                    imagen: '',
                    marca: req.body.marca,
                    ml: req.body.ml,
                    anio: req.body.anio,
                    descripcion: req.body.descripcion,
                    id: req.body.id
        
                } // Perfume

                if(req.file == undefined ){
                    perfume.imagen = data.imagen
                } else{
                    perfume.imagen = req.file.filename
                }

                perfume.idUsuario = data.idUsuario;

                Producto.update(perfume, {
                    where: [
                        {id: req.body.id}
                    ] //where
                })// update
                    .then(function(){
                        return res.redirect(`/products/id/${data.id}`)
                    })
                    .catch(error =>{
                        console.log(error)
                    });

            }) //Then grande

            .catch(error =>{
                console.log(error)
            }); // Catch grande
            

    }, //Método
    detail: function (req, res) {
        let idRuta = req.params.id
        Producto.findByPk(idRuta, {
            include: [  //relación comentario producto.
                { association: 'comentario',
                    include: { association: 'usuario' },
                },                           
                { association: 'usuario' }
            ],
            order: [['comentario', 'createdAt', 'DESC']]
        }) // Find by pk
            .then(data => {
                //Si no hay producto que coincida con el id, redirecciona a home.
                if (data == null) {
                    return res.redirect('/')
                } else {
                    return res.render('detail', { title: "Detalle Producto", resultado: data })
                }
            })
            .catch(error => {
                console.log(error)
            }) // Catch
    }, //DETAIL
    comment: function (req, res) {

        if (req.session.user) {
            /* return res.send (req.session.user) */

            //1) Obtener datos del formulario
            let data = req.body;

            // 2) Armar usuario
            let comentario = {
                idUsuario: req.session.user.id,
                idProducto: req.params.id,
                descripcion: data.descripcion,
            }

            // 3) Guardar perfume
            Comentario.create(comentario)
            return res.redirect(`/products/id/${req.params.id}`)
        } else {
            return res.redirect('/users/login')
        }
    },
    destroyComentario: function(req,res){
        Comentario.destroy({
            where: [
                {id: req.params.id}
            ]
        }) //destroy
        .then(function(){
            return res.redirect('/')
        })
        .catch(error =>{
            console.log(error)
        })
    },
    results: function (req, res) {
        let infoABuscar = req.query.search
        let filtro = req.query.filtro

        if (filtro == "todos") {
            Producto.findAll({
                where: {
                    [Op.or]: [
                        { nombre: { [Op.like]: "%" + infoABuscar + "%" } },
                        { marca: { [Op.like]: "%" + infoABuscar + "%" } },
                        { descripcion: { [Op.like]: "%" + infoABuscar + "%" } },
                        { idUsuario: { [Op.like]: "%" + infoABuscar + "%" } },
                    ]
                },
                order: [
                    ['nombre', 'ASC']
                ],
                include: [
                    { association: 'usuario' },
                    { association: 'comentario' }
                ] //Include
            })
                .then(data => {
                    // return res.send(data)
                    return res.render('results', { resultado: data, title: 'Resultados' })
                })
                .catch(error => {
                    console.log(error)
                })
        } else if (filtro == "productos") {
            Producto.findAll({
                where: {
                    [Op.or]: [
                        { nombre: { [Op.like]: "%" + infoABuscar + "%" } },
                    ]
                },
                order: [
                    ['nombre', 'ASC']
                ],
                include: [
                    { association: 'usuario' },
                    { association: 'comentario' }
                ] //Include
            })
                .then(data => {
                    return res.render('results', { resultado: data, title: 'Resultados' })
                })
                .catch(error => {
                    console.log(error)
                })
        } /* else if (filtro == "marcas") {
            Producto.findAll({
                where: {
                    [Op.or]: [
                        { marca: { [Op.like]: "%" + infoABuscar + "%" } },
                    ]
                },
                order: [
                    ['nombre', 'ASC']
                ],
                include: [
                    { association: 'usuario' },
                    { association: 'comentario' }
                ] //Include
            })
                .then(data => {
                    return res.render('results', { resultado: data, title: 'Resultados' })
                })
                .catch(error => {
                    console.log(error)
                })
        } */ else if (filtro == "descripcion") {
            Producto.findAll({
                where: {
                    [Op.or]: [
                        { descripcion: { [Op.like]: "%" + infoABuscar + "%" } },
                    ]
                },
                order: [
                    ['nombre', 'ASC']
                ],
                include: [
                    { association: 'usuario' },
                    { association: 'comentario' }
                ] //Include
            })
                .then(data => {
                    return res.render('results', { resultado: data, title: 'Resultados' })
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else if (filtro == "users") {
            Usuario.findAll({
                where: {
                    [Op.or]: [
                        { nombre: { [Op.like]: "%" + infoABuscar + "%" } },
                    ]
                },
                order: [
                    ['nombre', 'ASC']
                ],
                include: [  //relación usuario producto.
                    {
                        association: 'producto',
                        include: { association: 'usuario' }
                    },
                 
                ] // Include
            }) // Find All
                .then(data => {
                    // return res.send(data)
                    return res.render('resultsUsuarios', { resultado: data, title: 'Resultados' })
                })
                .catch(error => {
                    console.log(error)
                })
        } //else if
    }, //Results
} // Objeto literal

module.exports = productsController;