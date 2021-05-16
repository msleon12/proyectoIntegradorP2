const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController')

router.get('/', productsController.products)
router.get('/add', productsController.addProducts)
router.get('/id/:id', productsController.detail)
router.get('/results', productsController.results)
router.get('/marcas', productsController.marcas)

router.post('/store', productsController.store)

module.exports = router;


