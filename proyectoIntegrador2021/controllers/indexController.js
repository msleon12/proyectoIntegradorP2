// const products = require('../data/info')
const db = require('../database/models')
const Producto = db.Producto;


const indexController = {
    index: function(req,res){
        Producto.findAll()
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