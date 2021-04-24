const { comentarios, perfumes } = require('../data/info')
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
        if (id < 9){
            for(let i = 0; i< products.perfumes.length; i++){
                if(products.perfumes[i].id == id){
                    resultado = products.perfumes[i]
                    return res.render('detail', { title: "Detalle Producto", resultado: resultado, comentarios: comentarios})
                }
            }  
        } //IF
        else{
            return res.render('index', {title: "error1",  products: products.perfumes})
        }
    },
    results: function(req,res){
        return res.render('results', {title: 'Resultados', products: products.perfumes})
    },
} // Objeto literal

module.exports = productsController;