const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController')

router.get('/', productsController.products)

router.get('/add', productsController.addProducts)
router.post('/add/store', productsController.store)
router.post('/add/destroy', productsController.destroy)

router.get('/id/:id', productsController.detail)
router.post('/id/:id/comment', productsController.comment)

router.get('/results', productsController.results)
router.get('/marcas', productsController.marcas)

module.exports = router;



