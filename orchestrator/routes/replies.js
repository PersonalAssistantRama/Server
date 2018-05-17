const express = require('express');
const axios = require('axios')
const router = express.Router();

const { getReply } = require('../controllers/replies.controller')

/* GET home page. */
router.post('/', getReply);

module.exports = router;
