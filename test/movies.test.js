let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
const mongoose = require('mongoose');

const redis = require('redis');
const movieKey = process.env.MOVIE_SECRET
const redisKey = process.env.REDIS_SECRET

const client = redis.createClient('redis://redis-10020.c9.us-east-1-2.ec2.cloud.redislabs.com:10020');
client.auth(redisKey, function (err) {
  if (err) throw err;
})

chai.use(chaiHttp);

describe('Test Movies', function () {
  this.timeout(10000)
  client.flushall();
  describe('/GET movies', () => {
    it('it should GET food list from redis', (done) => {
      chai.request(app)
          .get('/movies')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('data');
              res.body.data.should.be.an('array');
            done();
          })
    })
  })

  describe('/GET movies', () => {
    it('it should GET food list', (done) => {
      chai.request(app)
          .get('/movies')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('data');
              res.body.data.should.be.an('array');
            done();
          })
    })
  })
})

