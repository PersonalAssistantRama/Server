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
  
  describe('/GET foods', () => {
    // client.flushdb();
    it('it should GET food list', (done) => {
      chai.request(app)
          .get('/foods')
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

