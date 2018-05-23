const axios = require('axios')
const redis = require('redis');
const foodKey = process.env.FOOD_SECRET

module.exports = {
  getAll : async (req, res) => {
    try {
      let foods = await axios.get(`https://developers.zomato.com/api/v2.1/search?count=6&lat=${req.body.lat}&lon=${req.body.long}&order=asc`,
      {
        headers:{
          'user-key': foodKey
        }
      })

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
