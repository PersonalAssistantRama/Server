let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
const mongoose = require('mongoose');

chai.use(chaiHttp);

describe('Test Users', function () {
  this.timeout(10000)

  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('Test Sign Up', () => {
    it('should create new user data', (done) => {
      const newUser = {
        username: 'test username',
        password: 'test password',
        first_name: 'test first name',
        last_name: 'test last name',
        gender: 'test gender',
        wakeUpTime: 'test wake up time',
        sleepTime: 'test sleep time'
      }

      chai.request(app)
          .post('/users/signup')
          .send(newUser)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.data.should.have.property('user');
            res.body.data.should.have.property('token');
            done();
          })
    })

    it('should not create new user data because username already exist', (done) => {
      const newUser = {
        username: 'test username',
        password: 'test password',
        first_name: 'test first name',
        last_name: 'test last name',
        gender: 'test gender',
        wakeUpTime: 'test wake up time',
        sleepTime: 'test sleep time'
      }

      chai.request(app)
          .post('/users/signup')
          .send(newUser)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('username already registered!!');
            done();
          })
    })
  })

  describe('Test Sign In', () => {
    it('should successfully sign in', (done) => {
      const user = {
        username: 'test username',
        password: 'test password',
      }

      chai.request(app)
          .post('/users/signin')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.data.should.have.property('user');
            res.body.data.should.have.property('token');
            done();
          })
    })

    it('sign in should failed because username is wrong', (done) => {
      const user = {
        username: 'wrong username',
        password: 'wrong password',
      }

      chai.request(app)
          .post('/users/signin')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('sign in failed!');
            done();
          })
    })

    it('sign in should failed because password is wrong', (done) => {
      const user = {
        username: 'test username',
        password: 'wrong password',
      }

      chai.request(app)
          .post('/users/signin')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('username/password is wrong!!');
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