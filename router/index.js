const express = require('express')
const router = express.Router();

var user = require('./user')
var api = require('./api')

router.use('/user', user)
router.use('/api', api)

module.exports = router