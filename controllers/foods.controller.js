const axios = require('axios')
const redis = require('redis');
const foodKey = process.env.FOOD_SECRET
const redisKey = process.env.REDIS_SECRET

const client = redis.createClient('redis://redis-10020.c9.us-east-1-2.ec2.cloud.redislabs.com:10020');
client.auth(redisKey, function (err) {
  if (err) throw err;
})

module.exports = {
  getAll : async (req, res) => {
    try {
      let foods = await axios.get('https://developers.zomato.com/api/v2.1/search?count=6&lat=-6.281078&lon=106.779703&order=asc',
      {
        headers:{
          'user-key': foodKey
        }
      })

      client.set('foods', JSON.stringify(foods.data.restaurants))
      res.status(200).json({
        message:'success load zomato',
        data: foods.data.restaurants
      })
    } catch (e) {
      res.status(400).json({
        message:'error load zomato',
        error: e
      })
    }
  }
};
