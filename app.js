const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require ('cors')
const mongoose = require('mongoose')
const redis = require('redis');
require('dotenv').load();

const redisKey = process.env.REDIS_SECRET
const userKey = process.env.MLABUSER_SECRET
const passKey = process.env.MLABPASS_SECRET

const app = express();

//Connect MongoDB Cloud - mlab
mongoose.connect(`mongodb://${userKey}:${passKey}@ds225840.mlab.com:25840/yupiusersdb`)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Yupi server connect to mongoDB - Mlab`)
});

//Connect Redis Cloud - redisLabs
const client = redis.createClient('redis://redis-10020.c9.us-east-1-2.ec2.cloud.redislabs.com:10020');
client.auth(redisKey, function (err) {
    if (err) throw err;
});
client.on('connect', function() {
    console.log('Connected to Redis Cloud');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
