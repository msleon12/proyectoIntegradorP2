const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController')

router.get('/register', usersController.register)
router.post('/register/store', usersController.store)
router.post('/register/destroy/:id', usersController.destroy)

router.get('/login', usersController.logIn)
router.post('/login/new', usersController.logInSession)
router.post('/logout', usersController.logout)

router.get('/editprofile', usersController.editProfile)
router.post('/editprofile/storeEdit', usersController.storeEdit)

router.get('/myprofile/:id', usersController.myProfile)


module.exports = router;
