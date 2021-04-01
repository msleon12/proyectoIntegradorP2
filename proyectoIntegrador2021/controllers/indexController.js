// const data = require('../data/info')
const indexController = {
    index: function(req,res){
        return res.render('index', {title: 'Index'})
    },

}

module.exports = indexController