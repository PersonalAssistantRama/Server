var express = require('express');
var router = express.Router();
const {signUp, signIn} = require('../controllers/Users.controller')

router.post('/signup', signUp)
router.post('/signin', signIn)

module.exports = router;
