const products = require('../data/info')

const indexController = {
    index: function(req,res){
        return res.render('index', {title: 'Index', products: products.perfumes})
    },
    quienesSomos: function(req,res){
        return res.render('quienesSomos', {title: 'Quienes Somos'})
    },
    

}

module.exports = indexController