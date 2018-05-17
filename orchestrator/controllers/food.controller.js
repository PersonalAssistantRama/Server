const axios = require('axios')
const redis = require('redis')
const client = redis.createClient();

module.exports = {
  async getAllFoods(req, res) {
    try {
      let foods = await axios.get('http://localhost:3002/foods')
      
      client.set('foods', JSON.stringify(foods.data))

      return res.status(200).json({
        message: 'get all foods success',
        data: foods.data
      })
    } catch (err) {
      return res.status(500).json({
        message: 'get all foods failed',
        err
      })
    }
  }
}
