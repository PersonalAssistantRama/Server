const axios = require('axios')
const redis = require('redis')
const client = redis.createClient();

module.exports = {
  async getQuiz(req, res) {
    try {
      let games = await axios.get('http://localhost:3003/games/quiz')

      return res.status(200).json({
        message: 'get quiz success',
        data: games.data
      })
    } catch (err) {
      return res.status(500).json({
        message: 'get quiz failed',
        err
      })
    }
  },
  async answerQuiz(req, res) {
    const { id, answer } = req.body;

    try {
      let games = await axios.post('http://localhost:3003/games/quiz', {
        id, answer
      })

      return res.status(200).json({
        message: 'answer quiz success',
        data: games.data
      })
    } catch (err) {
      return res.status(500).json({
        message: 'answer quiz failed',
        err
      })
    }
  },
  async addQuiz(req, res) {
    const { question, answers } = req.body;

    try {
      let games = await axios.post('http://localhost:3003/games/addquiz', {
        question, answers
      })

      return res.status(200).json({
        message: 'create quiz success',
        data: games.data
      })
    } catch (err) {
      return res.status(500).json({
        message: 'create quiz failed',
        err
      })
    }
  },
}
