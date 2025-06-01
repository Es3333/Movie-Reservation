const screen =require('../models/sreens')
const Movie = require('../models/movie')

exports.createScreens = async (req,res)=>{
    const { movieId } = req.params;
    const { date, time, capacity } = req.body;
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    try {
        const data =await  screen.create({
            movieId,date,time,capacity
        })
        res.json(data)
    }catch (err){
     res.json({message : err})
    }

}
exports.deleteScreen = async (req,res) =>{


    try {
        const { movieId } = req.params;
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        const data =await screen.destroy({where: movieId})
        res.json(data)
    }catch (err){
        res.json({message : err})
    }
}
exports.getScreensForMovie = async (req, res) => {
    const { movieId } = req.params;

    try {
        const data = await screen.findAll({ where:  movieId });
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching showtimes', error });
    }
};