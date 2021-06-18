const db = require('../database/models')
const Producto = db.Producto;
const Op = db.Sequelize.Op;


const indexController = {
    index: function(req,res){
        Producto.findAll({
            include: [
                {association: 'usuario'}, 
                {association:'comentario'}
            ], //Include
            order: [['createdAt', 'DESC']]
        })
            .then (data =>{
                return res.render('index', {title: 'Index', products: data})
            }) //Then
            .catch (error =>{
                console.log(error)
            }) // Catch
    }, //Index
    quienesSomos: function(req,res){
        return res.render('quienesSomos', {title: 'Quienes Somos'})
    },
    

}

module.exports = indexController