const express =require ('express')
const app = express()
const sequelize = require('./models/db')
const UserModel =require('./models/user.model')
const Movie =require('./models/movie')
const screens =require('./models/sreens')
const reservation =require('./models/reservation')

const authrouter = require('./routes/userRoute')
const movieRouter =require('./routes/movieRoute')
const screenRouter =require('./routes/screenRoute')
const reserveRouter = require('./routes/reservationRoute')
app.use(express.json())


app.use('/user',authrouter)
app.use('/movie',movieRouter)
app.use('/screen', screenRouter)
app.use('/reservation' , reserveRouter)
app.listen(3000, async ()=>{
    console.log('server running')
    try {
        sequelize.authenticate()
            .then(() => console.log('Database connected...'))
        sequelize.sync({ force: false })  // set force:true to drop tables and recreate
            .then(() => {
                console.log('All models were synchronized successfully.');
              // exit after sync
            })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})