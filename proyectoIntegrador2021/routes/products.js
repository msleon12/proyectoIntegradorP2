const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController')

router.get('/', productsController.products)
router.get('/add', productsController.addProducts)

module.exports = router;


