const Notification = require('../models/notification.model')

module.exports = {
  getNotification: (req, res) => {
    Notification.find({
      user: req.params.id
    })
      .then(response => {
        res.status(200).send({
          message: 'Query notification by user success',
          data: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Query notification by user failed',
          err: err.message
        })
      })
  },
  createNotification: (req, res) => {
    const { id, title, message, date } = req.body;

    let newNotification = Notification ({
      user: id, title, message, date
    })

    newNotification.save()
      .then(response => {
        res.status(200).send({
          message: 'Create new notification success',
          data: response
        })
      })
  },
  deleteNotification: (req, res) => {
    Notification.findByIdAndRemove({
      _id: req.params.id
    })
      .then(response => {
        res.status(200).send({
          message: 'Delete notification success',
          data: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Delete notification failed',
          err: err.message
        })
      })
  }
}