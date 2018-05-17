const axios = require('axios')
const movieKey = process.env.MOVIE_SECRET

module.exports = {
  getMovies: async (req, res) => {
    try {
      let movies = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${movieKey}&language=en-US&page=1`
      })
      console.log("movies===", movies.data.results.length)
      res.status(200).json({
        msg: "success get now playing movies",
        data: movies.data.results
      })
    } catch (error) {
      res.status(400).json({
        msg: 'failed get data',
        error
      })
    }
  }
}