const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const usersController = require('../controllers/usersController')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/perfiles'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
});

var upload = multer({ storage: storage})

router.get('/register', usersController.register)
router.post('/register/store', upload.single('img-perfil'), usersController.store)

router.get('/login', usersController.logIn)
router.post('/login/new', usersController.logInSession)
router.post('/logout', usersController.logout)

router.get('/editprofile/:id', usersController.editProfile)
router.post('/editprofile/storeEdit', upload.single('imagen'), usersController.storeEdit)

router.get('/myprofile/:id', usersController.myProfile)


module.exports = router;
