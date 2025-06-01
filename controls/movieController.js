const Movie =require('../models/movie')


exports.createMovie = async (req,res)=>{

    const {name ,description, genre, posterImage} =req.body
    try {
        const data =await Movie.create({
            name,description,genre,posterImage
        })
      return   res.json(data)
    }catch (err){
        res.json({message : err})
    }
}
exports.updateMovie = async (req,res)=>{

    const Movieid =req.params
    try {
        const { title, description, genre, posterImage } = req.body;
        const movie = await Movie.findOne({where : {id : Movieid}})
        if(!movie){
            return res.status(404).json({ message: 'Movie not found' });
        }
        const newMovie = await Movie.update({title, description, genre, posterImage} )
        res.json(newMovie)
    }catch (err){
        res.json({message : err})
    }

}
exports.deleteMovie = async (req,res)=>{
    const MovieId = req.params
    try {
        const movie = await Movie.findByPk(MovieId)
        if(!movie){
            return res.status(404).json({ message: 'Movie not found' });
        }
        const data =await Movie.destroy({where : {id : movie.id}})
        res.json({ message: 'Movie deleted' });
    }catch (err){
        res.json({message : err})
    }
}
exports.getMovies = async (req,res)=>{
    try {
        const data = await Movie.findAll()
        res.json(data)
    }catch (err){
        res.json({message : err})
    }
}
exports.getMoviesById = async (req,res)=>{
    const MovieId =req.params
    try {
        const data = await Movie.findByPk(MovieId)
        res.json(data)
    }catch (err){
        res.json({message : err})
    }
}