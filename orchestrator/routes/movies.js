const express = require('express');
const router = express.Router();

const { getAllMovies } = require('../controllers/movie.controller')

/* GET home page. */
router.get('/', getAllMovies);

module.exports = router;
