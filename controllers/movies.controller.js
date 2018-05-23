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
    let movies = await axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${movieKey}&language=en-US&page=1`
    })
    
    client.set('movies', JSON.stringify(movies.data.results), 'EX', 60)

    res.status(200).json({
      message: "success get now playing movies",
      data: movies.data.results
    })
  }
}