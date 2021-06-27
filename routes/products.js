const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productsController = require('../controllers/productsController')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
});

var upload = multer({ storage: storage})

router.get('/', productsController.products)

router.get('/add', productsController.addProducts)
router.post('/add/store', upload.single('img-producto'), productsController.store)
router.post('/destroy/:id', productsController.destroy)

router.get('/edit/:id', productsController.editProducts)
router.post('/edit/editProduct', upload.single('img-producto'), productsController.update);

router.get('/id/:id', productsController.detail)
router.post('/id/:id/comment', productsController.comment)
router.post('/destroyComentario/:id', productsController.destroyComentario)

router.get('/results', productsController.results)

module.exports = router;



