var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/replies', require('./replies'));
router.use('/foods', require('./foods'));
router.use('/movies', require('./movies'));
router.use('/games', require('./games'));

module.exports = router;