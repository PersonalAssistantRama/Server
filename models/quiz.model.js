const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quizSchema = mongoose.Schema({
  question: {
    type: String,
  },
  answers: [{
    type: String,
  }]
}, {
  timestamps: true
})

let Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz