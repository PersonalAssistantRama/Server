const express = require('express');
const router = express.Router();

const { getAllFoods } = require('../controllers/food.controller')
const { getCacheFoods } = require('../middlewares/getCache')

/* GET home page. */
router.get('/', getCacheFoods, getAllFoods);

module.exports = router;
