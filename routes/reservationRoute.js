const express =require('express')
const router = express.Router()
const reservationController = require('../controls/reservationController')
const auth = require('../middelware/auth')
router.post ('/reserve',auth.vertifytoken,reservationController.createReservation)
router.delete('/delete' ,auth.vertifytoken, reservationController.cancelReservation)
router.get('/getReservation' ,auth.vertifytoken , reservationController.getReservationsforUser)
router.get('/getReservationForAdmin' ,auth.vertifytoken ,auth.isAdmin , reservationController.getReservationsforAdmin)

module.exports= router