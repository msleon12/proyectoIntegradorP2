const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController')

router.get('/', productsController.products)
router.get('/add', productsController.addProducts)
router.get('/id/:id', productsController.detail)

module.exports = router;


