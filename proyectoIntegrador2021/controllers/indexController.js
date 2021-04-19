const products = require('../data/info')

const indexController = {
    index: function(req,res){
        return res.render('index', {title: 'Index', products: products.perfumes, products2: products.perfumes2})
    },
    quienesSomos: function(req,res){
        return res.render('quienesSomos', {title: 'Quienes Somos'})
    },
    

}

module.exports = indexController