const Quiz = require('../models/quiz.model');
const GuessWord = require('../models/guessword.model');

module.exports = {
  async getQuiz(req, res) {
    try {
      const quizzes = await Quiz.find();
      const randomWord = quizzes[ Math.floor(Math.random() * quizzes.length) ];
      
      res.status(200).json({
        message: 'Get quiz success',
        data: randomWord
      })
    } catch (err) {
      res.status(400).json({
        message: 'error from catch',
        err,
      })
    }
  },
  async getGuessWord(req, res) {
    try {
      const words = await GuessWord.find();
      const randomWord = words[ Math.floor(Math.random() * words.length) ];

      res.status(200).json({
        message: 'Get word to guess success',
        data: randomWord
      })
    } catch (err) {
      res.status(400).json({
        message: 'error from catch',
        err,
      })
    }
  },
  async answerQuiz(req, res) {
    const { id, answer } = req.body;
    let isCorrect = false;

    try {
      let question = await Quiz.findById(id);

      const answers = question.answers.map((answer) => {
        return answer.toLowerCase();
      })

      if(answers.indexOf(answer.toLowerCase()) !== -1) {
        isCorrect = true;
      }

      res.status(200).json({
        message: 'ok',
        data: { question, answer, isCorrect },
      })
    } catch(err) {
      res.status(400).json({
        message: 'error from catch',
        err,
      })
    }
  },
  answerGuessWord(req, res) {
    const { word, current, guessLeft, guess, guessedWord } = req.body;

    let wordTmp = word.toLowerCase().split('');
    let isFind = false;
    let isWin = false;
    let isLose = false;

    if(guessedWord.indexOf(guess.toLowerCase()) === -1) {
      for(let i in wordTmp) {
        if(wordTmp[i] === guess) {
          let newCurrentWord = [];
          for(let j in current) {
            if(i === j) {
              newCurrentWord.push(word[i]);
            } else {
              newCurrentWord.push(current[j]);
            }
          }
          isFind = true;
          if(newCurrentWord.indexOf('_') === -1) {
            isWin = true;
          }
        }
      }
      if(!isFind) {
        guessedWord.push(guess);
        guessLeft--;
        if(guessLeft <= 0) {
          isLose = true;
        }
      }
    }
    res.status(201).send({
      message: 'answer guess word success',
      data: { current: newCurrentWord, guessLeft, guessedWord, isWin, isLose }
    })
  },
  addQuiz(req, res) {
    let quiz = new Quiz(req.body)
  
    quiz.save()
      .then(result => {
        res.status(201).send({
          message: 'add new quiz success',
          data: result
        })
      })
      .catch(err => {
        res.status(400).send({
          message: err.message
        })
      })
  },
  addGuessWord(req, res) {
    let guessWord = new GuessWord(req.body)
  
    guessWord.save()
      .then(result => {
        res.status(201).send({
          message: 'add new word to guess success',
          data: result
        })
      })
      .catch(err => {
        res.status(400).send({
          message: err.message
        })
      })
  },
}