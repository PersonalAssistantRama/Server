const express = require('express');
const router = express.Router();

const { getAllMovies } = require('../controllers/movie.controller')
const { getCacheMovies } = require('../middlewares/getCache')

/* GET home page. */
router.get('/', getCacheMovies, getAllMovies);

module.exports = router;
