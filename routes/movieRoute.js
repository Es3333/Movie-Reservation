const express =require('express')
const router = express.Router()
const movieController = require('../controls/movieController')
const auth = require('../middelware/auth')
router.post('/createMovie' ,auth.vertifytoken,auth.isAdmin, movieController.createMovie)
router.delete('/deleteMove/:movieId', movieController.deleteMovie)
router.put('/updateMovie/:movieId', auth.vertifytoken, auth.vertifytoken, movieController.updateMovie);
router.get('/getMovies', movieController.getMovies)




module.exports= router