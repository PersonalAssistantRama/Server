const express = require('express');
const axios = require('axios')
const router = express.Router();

const gamesController = require('../controllers/games.controller')

/* GET home page. */
router.get('/quiz', gamesController.getQuiz);
router.post('/quiz', gamesController.answerQuiz);
router.post('/addquiz', gamesController.addQuiz);

module.exports = router;
