var express = require('express');
var router = express.Router();
const foodController = require('../controllers/foods.controller')

router.post('/', foodController.getAll)

module.exports = router;