const express =require('express')
const router = express.Router()
const screenController = require('../controls/screenController')
const auth =require('../middelware/auth')

router.post ('/:movieId/createScreen' , auth.vertifytoken,auth.isAdmin , screenController.createScreens)
router.get('/screens' , screenController.getScreensForMovie)
router.delete('/deleteScreen' , auth.vertifytoken,auth.isAdmin,screenController.deleteScreen)
module.exports =router