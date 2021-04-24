const data = require('../data/info')

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
            for(let i = 0; i< data.perfumes.length; i++){
                if(data.perfumes[i].id == id){
                    resultado = data.perfumes[i]
                    return res.render('detail', { title: "Detalle Producto", resultado: resultado, comentarios: data.comentarios})
                }
            }  
        } //IF
        else{
            return res.render('index',  {title: "error1",  products: data.perfumes})
        }
    },
    results: function(req,res){
        return res.render('results', {title: 'Resultados', products: data.perfumes})
    },
} // Objeto literal

module.exports = productsController;