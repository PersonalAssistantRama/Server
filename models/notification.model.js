const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  date: {
    type: Date
  }
}, {
  timestamps: true
})

let Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification