const db = require('../database/models')
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
        return res.render('addProducts', {title: "Agregar productos"})
    },
    detail: function(req,res){ //Falta saber relacionar tablas. 
        let id = req.params.id
        
        // Comentario.findAll({
        //     where: [{idProducto: {[Op.like]: id}}]
        // }) //Comentario
        //     .then(comentario =>{
        //         return comentario
        //     })
        //     .catch(error =>{
        //         console.log(error)
        //     })
        
        Producto.findByPk(id)
        .then(data=>{
            return res.render('detail', { title: "Detalle Producto", resultado: data, comentarios: "" }) //Completar
        })
        .catch (error =>{
            console.log(error)
        }) // Catch

        
    }, //DETAIL
    results: function(req,res){
        let infoABuscar = req.query.search
        /* Producto.findAll({
            where:[
                {nombre:{[Op.like]:"%" + infoABuscar + "%"}}
            ] //Where
        }) // Find all */

        Producto.findAll({
            where:{
                [Op.or]: [
                    {nombre: {[Op.like]: "%" + infoABuscar + "%"}},
                    {marca: {[Op.like]: "%" + infoABuscar + "%"}},
                ]
            },
            order: [
                ['nombre','ASC']
            ]
          })
        .then(data =>{
            return res.render('results', {resultado: data, title: 'Resultados'})
            // return res.send(data)
        })
        .catch(error =>{
            console.log(error)
        })
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
            imagen: data.imagen,
            fechaPublicacion: data.fechaPublicacion,
            marca: data.marca,
            ml: data.ml,
            anio: data.anio,
            descripcion: data.descripcion, 
        }

        // 3) Guardar perfume
        db.Producto.create(perfume)
            .then(producto =>{
                // 4) redireccionar
                return res.redirect('/', {products: perfume, title: 'productos'})
            })
            .error(error =>{
                console.log(error)
            })

    
    } //Store

} // Objeto literal

module.exports = productsController;