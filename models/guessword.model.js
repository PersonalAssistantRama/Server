const mongoose = require('mongoose')
const Schema = mongoose.Schema

const guessWordSchema = mongoose.Schema({
  word: {
    type: String,
  },
}, {
  timestamps: true
})

let GuessWord = mongoose.model('GuessWord', guessWordSchema)

module.exports = GuessWord