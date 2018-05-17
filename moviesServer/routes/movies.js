var express = require('express');
var router = express.Router();
const {getMovies} = require('../controllers/movies')

router.get('/', getMovies)

module.exports = router;
