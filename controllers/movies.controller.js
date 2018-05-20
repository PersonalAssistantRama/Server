const axios = require('axios')
const redis = require('redis');

const movieKey = process.env.MOVIE_SECRET
const redisKey = process.env.REDIS_SECRET

const client = redis.createClient('redis://redis-10020.c9.us-east-1-2.ec2.cloud.redislabs.com:10020');
client.auth(redisKey, function (err) {
  if (err) throw err;
})

module.exports = {
  getMovies: async (req, res) => {
    try {
      let movies = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${movieKey}&language=en-US&page=1`
      })
      
      client.set('movies', JSON.stringify(movies.data.results))

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