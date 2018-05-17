const axios = require('axios')
const redis = require('redis')
const client = redis.createClient();

module.exports = {
  async getReply(req, res) {
    try {
      let replies = await axios.post('http://localhost:3004/replies', {
        text: req.body.text
      })

      return res.status(200).json({
        message: 'get reply success',
        data: replies.data
      })
    } catch (err) {
      return res.status(500).json({
        message: 'get reply failed',
        err
      })
    }
  }
}
