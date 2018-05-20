const redis = require('redis')
const client = redis.createClient('redis://redis-10020.c9.us-east-1-2.ec2.cloud.redislabs.com:10020');
client.auth('pUVrMLPB5j36nGu3bfG2LbDXgBVigFRh', function (err) {
    if (err) throw err;
});

const getCacheFoods = (req, res, next) => {
  client.get('foods', (err, reply) => {
    if (err) {
      res.status(500).json({
        message:err.message
      })
    } else {
      if (reply) {
        res.status(200).json({
          message: 'get all foods redis success',
          data: JSON.parse(reply)
        })
      } else {
        next()
      }
    }
  })
}

const getCacheMovies = (req, res, next) => {
  client.get('movies', (err, reply) => {
    if (err) {
      res.status(500).json({
        message:err.message
      })
    } else {
      if (reply) {
        res.status(200).json({
          message: 'get all Movies redis success',
          data: JSON.parse(reply)
        })
      } else {
        next()
      }
    }
  })
}

module.exports = {
  getCacheFoods,
  getCacheMovies
}

