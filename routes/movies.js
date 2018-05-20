var express = require('express');
var router = express.Router();
const movieController = require('../controllers/movies.controller')
const { getCacheMovies } = require('../middlewares/getCache')

router.get('/', getCacheMovies, movieController.getMovies)

module.exports = router;
