const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  gender: String,
  wakeUpTime: String,
  sleepTime: String
});

const User = mongoose.model('User', userSchema);

module.exports = User