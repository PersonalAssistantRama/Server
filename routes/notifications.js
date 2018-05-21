const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller')

router.get('/:id', notificationController.getNotification)
router.post('/', notificationController.createNotification)
router.delete('/:id', notificationController.deleteNotification)

module.exports = router;