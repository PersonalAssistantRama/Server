const Quiz = require('../models/quiz.model');
const GuessWord = require('../models/guessword.model');

module.exports = {
  async getQuiz(req, res) {
    const quizzes = await Quiz.find();
    const randomWord = quizzes[ Math.floor(Math.random() * quizzes.length) ];
    
    res.status(200).json({
      message: 'Get quiz success',
      data: randomWord
    })
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
  addQuiz(req, res) {
    let quiz = new Quiz(req.body)
  
    quiz.save()
      .then(result => {
        res.status(201).send({
          message: 'add new quiz success',
          data: result
        })
      })
  },
}