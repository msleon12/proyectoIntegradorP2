const products = require('../data/info')

const productsController = {
    products: function(req,res){
        return res.render('index', {title: 'Todos los productos'})
    },
    addProducts: function(req,res){
        return res.render('users', {title: "Agregar productos"})
    }, 
    detail: function(req,res){
        let id = req.params.id
        let resultado = ""
        for(let i = 0; i< products.perfumes.length; i++){
            if(products.perfumes[i].id == id){
                resultado = products.perfumes[i]
                return res.render('detail', { title: "Detalle Producto", resultado: resultado })
            }
        }
        
        
    }
} // Objeto literal

module.exports = productsController;