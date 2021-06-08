const db = require('../database/models')
const Usuario = db.Usuario
const Producto = db.Producto;
const Comentario = db.Comentario;
const Op = db.Sequelize.Op;

const productsController = {
    products: function(req,res){
        Producto.findAll()
            .then (data =>{
                return res.render('index', {title: 'Index', products: data})
            }) //Then
            .catch (error =>{
                console.log(error)
            }) // Catch
    },
    addProducts: function(req,res){
        // Control de acceso 
        if (req.session.user == undefined){
            return res.redirect('/users/login')
        }
        else{
            Producto.findAll()
            .then(data =>{
                return res.render('addProducts', {title: "Agregar productos", producto: data})
            })
            .catch(error =>{
                console.log(error)
            })
        }
        
    },
    editProducts: function(req,res){
        let productId = req.params.id;
        //Evitar que el usuario cambie el id en la URL
        if (productId != locals.idProducto){
            return res.redirect(`/`)
        }
        else {
            Producto.findByPk (productId)
            .then (function(Producto){
                return res.render('editProducts', {title: "Editar producto"})
            })
            .catch (e => {console.log(e)})
       }
       
      
    },
    update: function (req, res) {
// Actualizar un producto
let product = {
    //idUsuario: req.session.user.id,
    nombre: req.body.nombre,
    //imagen: req.file.filename,
    fechaPublicacion: req.body.fechaPublicacion,
    marca: req.body.marca,
    ml: req.body.ml,
    anio: req.body.anio,
    descripcion: req.body.descripcion, 

}
return res.send (product);

// db.Producto.update(product, {
//     where:{
        
//     }
// })
//.then ()
//.catch(e => )
    },
    productosUsuario: function(req,res){
        if(req.session.user == undefined){
            return res.redirect('/')
        } //IF
        else{
            Usuario.findByPk(req.params.id , 
                {include: [
                    // relación producto usuario                                
                    { association: 'producto' }
                ]
            }) //Usuario
            .then(data => {
                if (data == null){
                    return res.redirect('/')
                }
                else{
                    return res.render('productosUsuario', {resultado: data})
                }
            }) // Then
            .catch(error =>{
                console.log(error)
            })
        } //ELSE
        
    }, //Productos Usuario
    detail: function(req,res){  
        let idRuta = req.params.id    
        Producto.findByPk(idRuta,{
            include: [  //relación comentario producto.
                { association:'comentario',
                  include:{ association: 'usuario'}
                },
               // relación producto usuario                                
                { association: 'usuario' }
            ]
        }) // Find by pk
            .then(data =>{
                //Si no hay producto que coincida con el id, redirecciona a home.
                if(data == null){
                    return res.redirect('/')
                } else {
                    return res.render('detail', { title: "Detalle Producto", resultado: data }) 
                }
            })
            .catch (error =>{
                console.log(error)
            }) // Catch
    }, //DETAIL
    comment: function(req,res){

        if(req.session.user){
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
            return res.redirect('/')
        } else {
            return res.redirect('/users/login')
        }
    },
    results: function(req,res){
        let infoABuscar = req.query.search
        let filtro = req.query.filtro
        
        if(filtro=="todos"){
            Producto.findAll({
                where:{
                    [Op.or]: [
                        {nombre: {[Op.like]: "%" + infoABuscar + "%"}},
                        {marca: {[Op.like]: "%" + infoABuscar + "%"}},
                        {descripcion: {[Op.like]: "%" + infoABuscar + "%"}},
                        {idUsuario: {[Op.like]: "%" + infoABuscar + "%"}},
                    ]
                },
                order: [
                    ['nombre','ASC']
                ],
                include: [
                    {association: 'usuario'}, 
                    {association:'comentario'}
                ] //Include
            })
            .then(data =>{
                return res.render('results', {resultado: data, title: 'Resultados'})
            })
            .catch(error =>{
                console.log(error)
            })
       } else if(filtro=="productos"){
            Producto.findAll({
                where:{
                    [Op.or]: [
                        {nombre: {[Op.like]: "%" + infoABuscar + "%"}},
                    ]
                },
                order: [
                    ['nombre','ASC']
                ],
                include: [
                    {association: 'usuario'}, 
                    {association:'comentario'}
                ] //Include
            })
            .then(data =>{
                return res.render('results', {resultado: data, title: 'Resultados'})
            })
            .catch(error =>{
                console.log(error)
            })
        } else if(filtro=="marcas"){
            Producto.findAll({
                where:{
                    [Op.or]: [
                        {marca: {[Op.like]: "%" + infoABuscar + "%"}},
                    ]
                },
                order: [
                    ['nombre','ASC']
                ],
                include: [
                    {association: 'usuario'}, 
                    {association:'comentario'}
                ] //Include
            })
            .then(data =>{
                return res.render('results', {resultado: data, title: 'Resultados'})
            })
            .catch(error =>{
                console.log(error)
            })
       } else if(filtro=="descripcion"){
            Producto.findAll({
                where:{
                    [Op.or]: [
                        {descripcion: {[Op.like]: "%" + infoABuscar + "%"}},
                    ]
                },
                order: [
                    ['nombre','ASC']
                ],
                include: [
                    {association: 'usuario'}, 
                    {association:'comentario'}
                ] //Include
            })
            .then(data =>{
                return res.render('results', {resultado: data, title: 'Resultados'})
            })
            .catch(error =>{
                console.log(error)
            })
        } 
        // else if (filtro == "users"){
        //     Usuario.findAll({
        //         where: {
        //             [Op.or]: [
        //                 {idUsuario: {[Op.like]: "%" + infoABuscar + "%"}},
        //             ]
        //         },
        //         order: [
        //             ['nombre','ASC']
        //         ],
        //         include: [  //relación comentario producto.
        //             { association:'comentario',
        //               include:{ association: 'usuario'}
        //             },
        //            // relación producto usuario                                
        //             { association: 'usuario' }
        //         ] // Include
        //     }) // Find All
        //     .then(data =>{
        //         return res.render('results', {resultado: data, title: 'Resultados'})
        //     })
        //     .catch(error =>{
        //         console.log(error)
        //     })
        // } //else if
    }, //Results
    marcas: function(req,res){
        Producto.findAll({
            include: [
                {association: 'usuario'}, 
                {association:'comentario'}
            ] //Include
        }) //Find All
        .then(data=>{
            return res.render('results', { title: "Marcas", resultado: data })
        })
        .catch (error =>{
            console.log(error)
        }) // Catch
    }, //Marcas
    store: function(req,res){ //Guardar un perfume

        let errors = {}

        if(req.body.nombre == ""){
            errors.message = "El nombre es obligatorio.";
            res.locals.errors = errors;
            return res.render('addProducts', {title: 'Agregar productos'})

        } else if(req.file == undefined){
            errors.message = "La imagen es obligatoria.";
            res.locals.errors = errors;
            return res.render('addProducts', {title: 'Agregar productos'})

        } else if(req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg'){
            errors.message = "Debe subir una imagen en formato jpg, jpeg o png.";
            res.locals.errors = errors;
            return res.render('register', {title: 'Agregar productos'})

        } else if(req.body.marca == ""){
            errors.message = "La marca es obligatoria.";
            res.locals.errors = errors;
            return res.render('addProducts', {title: 'Agregar productos'})

        } else if(req.body.ml == ""){
            errors.message = "La cantidad de mililitros es obligatoria.";
            res.locals.errors = errors;
            return res.render('addProducts', {title: 'Agregar productos'})

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
            db.Producto.create(perfume)
            return res.redirect('/')
        }

    }, //Store
    destroy: function(req,res){
        let productoABorrar = req.params.id;

        /* return res.send (Producto.idUsuario) */

        if(req.session.user){
            /* if(req.session.user.id = Producto.idUsuario){ */
                db.Producto.destroy({
                    where: [
                        {id: productoABorrar},
                        {idUsuario: req.session.user}
                    ]
                })
                return res.redirect ('/');
            //} 
        } /* if */ else{
            return res.redirect('/users/login')
        }
    
    },
} // Objeto literal

module.exports = productsController;