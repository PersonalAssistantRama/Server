var express = require('express');
var router = express.Router();
const movieController = require('../controllers/foods.controllers')

/* GET users listing. */
router.get('/', movieController.getAll)


module.exports = router;
