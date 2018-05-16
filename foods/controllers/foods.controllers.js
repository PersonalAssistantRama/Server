// const Movie = require('../models/Food')
const axios = require('axios')

module.exports = {
  getAll : async (req, res) => {
    try {
      let foods = await axios.get('https://developers.zomato.com/api/v2.1/search?count=6&lat=-6.281078&lon=106.779703&order=asc',
      {
        headers:{
          'user-key':'7e9d8c06b1159770c4b8a8ff370da895'
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
