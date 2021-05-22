const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController')

router.get('/register', usersController.register)
router.post('/register/store', usersController.store)

router.get('/login', usersController.logIn)
router.post('/', usersController.logInSession)

router.get('/editprofile', usersController.editProfile)
router.post('/editprofile/storeEdit', usersController.storeEdit)

router.get('/myprofile/:id', usersController.myProfile)


module.exports = router;
