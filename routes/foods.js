var express = require('express');
var router = express.Router();
const foodController = require('../controllers/foods.controller')
const { getCacheFoods } = require('../middlewares/getCache')

router.get('/', getCacheFoods, foodController.getAll)

module.exports = router;