// const data = require('../data/info')
const db = require('../database/models')
const Producto = db.Producto;

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
        let resultado = ""
        Producto.findByPk(id)
        .then(data=>{
            return res.render('detail', { title: "Detalle Producto", resultado: data, comentarios: "" }) //Completar
        })
        .catch (error =>{
            console.log(error)
        }) // Catch
        
        // if (id < data.perfumes.length || id == data.perfumes.length){
        //     for(let i = 0; i< data.perfumes.length; i++){
        //         if(data.perfumes[i].id == id){
        //             resultado = data.perfumes[i]
        //             return res.render('detail', { title: "Detalle Producto", resultado: resultado, comentarios: data.comentarios})
        //         }
        //     }  
        // } //IF
        // else{
        //     return res.render('index',  {title: "error1",  products: data.perfumes})
        // }
    },
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