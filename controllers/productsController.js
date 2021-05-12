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
        return res.render('users', {title: "Agregar productos"})
    },
    detail: function(req,res){
        let id = req.params.id
        
        Comentario.findAll({
            where: [{idProducto: {[Op.like]: id}}]
        }) //Comentario
            .then(comentario =>{
                return comentario
            })
            .catch(error =>{
                console.log(error)
            })
        
        Producto.findByPk(id)
        .then(data=>{
            return res.render('detail', { title: "Detalle Producto", resultado: data, comentarios: comentario }) //Completar
        })
        .catch (error =>{
            console.log(error)
        }) // Catch

        
    }, //DETAIL
    results: function(req,res){
        return res.render('results', {title: 'Resultados', resultado: data})
    },
    marcas: function(req,res){
        Producto.findAll()
        .then(data=>{
            return res.render('results', { title: "Marcas", resultado: data })
        })
        .catch (error =>{
            console.log(error)
        }) // Catch
    }
} // Objeto literal

module.exports = productsController;