const axios = require('axios')
const redis = require('redis')
const client = redis.createClient();

module.exports = {
  async getAllMovies(req, res) {
    try {
      let movies = await axios.get('http://localhost:3001/movies')
      
      client.set('movies', JSON.stringify(movies.data))

      return res.status(200).json({
        message: 'get all movies success',
        data: movies.data
      })
    } catch (err) {
      return res.status(500).json({
        message: 'get all movies failed',
        err
      })
    }
  }
}
