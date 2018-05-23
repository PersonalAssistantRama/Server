let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
const mongoose = require('mongoose');

chai.use(chaiHttp);

describe('Test Notifications', function () {
  this.timeout(15000);

  let id = '5b04c6070a19f417c314e58e';
  let notifid = '';

  describe('/POST new Notifications', () => {
    it('it should post new notification', (done) => {
      const newNotification = {
        id,
        title: 'Title Testing',
        message: 'Message Testing',
        date: new Date() - 100000
      }

      chai.request(app)
          .post(`/notifications/`)
          .send(newNotification)
          .end((err, res) => {
            notifid = res.body.data._id;
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            done();
          })
    })

    it('it should post new notification', (done) => {
      const date = new Date();
      date.setHours(date.getHours()+10);
      const newNotification = {
        id,
        title: 'Title Testing',
        message: 'Message Testing',
        date
      }

      chai.request(app)
          .post(`/notifications/`)
          .send(newNotification)
          .end((err, res) => {
            notifid = res.body.data._id;
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            done();
          })
    })
  })

  describe('/GET Notifications', () => {
    it('it should get all notifications by id user', (done) => {
      chai.request(app)
          .get(`/notifications/${id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            done();
          })
    })

    it('it should not get all notifications because id user is invalid', (done) => {
      chai.request(app)
          .get(`/notifications/invalidid`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('err');
            done();
          })
    })
  })

  describe('/DELETE Notifications', () => {
    it('it should delete notification by notification id', (done) => {
      chai.request(app)
          .delete(`/notifications/${notifid}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            done();
          })
    })

    it('it should not delete notification because notification id is invalid', (done) => {
      chai.request(app)
          .delete(`/notifications/invalidid`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('err');
            done();
          })
    })
  })
})