const express = require('express');
const router = express.Router();

const { getAllFoods } = require('../controllers/food.controller')

/* GET home page. */
router.get('/', getAllFoods);

module.exports = router;
