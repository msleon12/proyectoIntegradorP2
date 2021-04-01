// const data = require('../data/info')

const productsController = {
    products: function(req,res){
        return res.render('index', {title: 'Todos los productos'})
    },
    addProducts: function(req,res){
        return res.render('products', {title: "Agregar productos"})
    }
}

module.exports = productsController;