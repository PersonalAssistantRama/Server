let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
const mongoose = require('mongoose');

const redis = require('redis');
const foodKey = process.env.FOOD_SECRET
const redisKey = process.env.REDIS_SECRET

const client = redis.createClient('redis://redis-10020.c9.us-east-1-2.ec2.cloud.redislabs.com:10020');
client.auth(redisKey, function (err) {
  if (err) throw err;
})

chai.use(chaiHttp);

describe('Test Foods', function () {
  this.timeout(10000)
  describe('/POST foods', () => {
    it('it should GET food list', (done) => {
      const location = {
        long: '106.781616',
        lat: '-6.260719'
      }

      chai.request(app)
          .post('/foods')
          .send(location)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('data');
              res.body.data.should.be.an('array');
            done();
          })
    })

    it('it should not GET food list', (done) => {
      chai.request(app)
          .post('/foods')
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

