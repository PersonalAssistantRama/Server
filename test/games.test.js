let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
const mongoose = require('mongoose');

chai.use(chaiHttp);

describe('Test Games', function () {
  this.timeout(15000);

  const answerId = '';

  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('/POST addquiz', () => {
    it('it should POST new quiz', (done) => {
      let quiz = {
        question: "New Question by Chai",
        answers: "New Answer by Chai",
      }

      chai.request(app)
          .post('/games/addquiz')
          .send(quiz)
          .end((err, res) => {
              id = res.body.data._id;
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('data');
              res.body.data.should.have.property('answers');
              res.body.data.should.have.property('_id');
              res.body.data.should.have.property('question');
              res.body.data.should.have.property('createdAt');
              res.body.data.should.have.property('updatedAt');
            done();
          })
    })
  })

  describe('Test Quiz', () => {
    describe('/GET quiz', () => {
      it('it should GET one random quiz', (done) => {
        chai.request(app)
            .get('/games/quiz')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.data.should.be.an('object');
                res.body.data.should.have.property('answers');
                res.body.data.answers.should.be.an('array');
                res.body.data.should.have.property('_id');
                res.body.data.should.have.property('question');
                res.body.data.should.have.property('createdAt');
                res.body.data.should.have.property('updatedAt');
              done();
            })
      })
    })

    describe('/POST quiz', () => {
      it('it should POST answer and get response isCorrect = true', (done) => {
        const rightAnswer = {
          id,
          answer: 'New Answer by Chai'
        }

        chai.request(app)
            .post('/games/quiz')
            .send(rightAnswer)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.data.should.be.an('object');
                res.body.data.should.have.property('question');
                res.body.data.should.have.property('answer');
                res.body.data.should.have.property('isCorrect');
                res.body.data.isCorrect.should.equal(true);
              done();
            })
      })

      it('it should POST answer and get response isCorrect = false', (done) => {
        const wrongAnswer = {
          id,
          answer: 'Ga Tau'
        }

        chai.request(app)
            .post('/games/quiz')
            .send(wrongAnswer)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.data.should.be.an('object');
                res.body.data.should.have.property('question');
                res.body.data.should.have.property('answer');
                res.body.data.should.have.property('isCorrect');
                res.body.data.isCorrect.should.equal(false);
              done();
            })
      })

      it('it should not POST answer because id is invalid', (done) => {
        const rightAnswer = {
          id: 'invalid id',
          answer: 'no answers'
        }

        chai.request(app)
            .post('/games/quiz')
            .send(rightAnswer)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('err');
                res.body.err.should.be.an('object');
                res.body.err.should.have.property('message');
                res.body.err.should.have.property('name');
                res.body.err.should.have.property('stringValue');
                res.body.err.should.have.property('kind');
                res.body.err.should.have.property('value');
                res.body.err.should.have.property('path');
              done();
            })
      })
    })

    after(function(done){
      mongoose.connection.db.dropDatabase(function(){
        mongoose.connection.close(done);
      });
    });
  })
})
