const products = require('../data/info')

const usersController = {
    register: function(req,res){
        return res.render('users', {title: 'Creá tu cuenta'})
    },
    logIn: function(req,res){
        return res.render ('users', {title: 'Iniciá sesión'})
    }, 
    editProfile: function(req,res){
        return res.render('users', {title: 'Editar mi perfil'})
    },
    myProfile: function(req,res){
        let id = req.params.id
        let resultado = ""
        if(id< products.comentarios.length || id == products.comentarios.length){
            for(let i = 0; i< products.comentarios.length; i++){
                if(products.comentarios[i].id == id){
                    resultado = products.comentarios[i]
                    return res.render('myProfile', { title: 'Mi Perfil', resultado: resultado, products: products.perfumes})
                }
            }  
        } // IF
        else{
            return res.render('index', {title: "error2",  products: products.perfumes})
        }
        
    },

}

module.exports = usersController