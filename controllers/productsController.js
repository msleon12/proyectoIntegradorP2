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
            return res.redirect('/users/register')
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
        return res.render('editProducts', {title: "Editar producto"})
    },
    detail: function(req,res){  
        let idRuta = req.params.id    
        Producto.findByPk(idRuta,{
            order: [
                ['nombre','DESC']
            ],
            include: [  //relación comentario producto.
                { association:'comentario',
                  include:{ association: 'usuario'}
                },
               // relación producto usuario                                
                { association: 'usuario' }
            ] //
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
        //1) Obtener datos del formulario
        let data = req.body;

        // 2) Armar usuario
        let comentario = {
            // idUsuario: ?
            idProducto: req.params.id,
            descripcion: data.descripcion,
        }

        // 3) Guardar perfume
        Comentario.create(comentario)
        return res.redirect('/')
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
    }, //Results
    marcas: function(req,res){
        Producto.findAll()
        .then(data=>{
            return res.render('results', { title: "Marcas", resultado: data })
        })
        .catch (error =>{
            console.log(error)
        }) // Catch
    }, //Marcas
    store: function(req,res){ //Guardar un perfume
        //1) Obtener datos del formulario
        let data = req.body;

        // 2) Armar perfume
        let perfume = {
            idUsuario: data.idUsuario,
            nombre: data.nombre,
            /* imagen: data.imagen, */
            fechaPublicacion: data.fechaPublicacion,
            marca: data.marca,
            ml: data.ml,
            anio: data.anio,
            descripcion: data.descripcion, 
        }

        // 3) Guardar perfume
        db.Producto.create(perfume)
        return res.redirect('/')

    }, //Store
    destroy: function(req,res){
        let productoABorrar = req.params.id;
       // return res.send (productoABorrar) // Deberia devolverme un numero

        db.Producto.destroy({
            where: [
                {id: productoABorrar}
            ]
        })

        return res.redirect ('/');
    
    }
} // Objeto literal

module.exports = productsController;