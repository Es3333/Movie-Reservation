const express =require('express')
const router =express.Router()
const userController = require('../controls/userControler')
router.post('/signup', userController.signUp)
router.post('/login', userController.login)
module.exports=router