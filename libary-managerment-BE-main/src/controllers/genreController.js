import Genre from "../models/genreModel"

const getGenreList = async (req, res) => {
    try {
        let genres = await Genre.getGenreList();
        return res.status(200).json({
            message: 'OK',
            genreData: genres
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })
    }
}


module.exports = {
    getGenreList
}