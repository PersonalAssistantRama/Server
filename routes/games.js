const express = require('express');
const axios = require('axios')
const router = express.Router();

const { getQuiz, answerQuiz, addQuiz, getGuessWord, addGuessWord } = require('../controllers/games')

/* GET home page. */
router.get('/quiz', getQuiz);
router.post('/quiz', answerQuiz);
router.post('/addquiz', addQuiz);
router.get('/guessword', getGuessWord);
router.post('/addguessword', addGuessWord);

module.exports = router;
