const express = require('express')
const router = express.Router();

var user = require('./user')
var api = require('./api')
var project = require('./project')

router.use('/user', user)
router.use('/api', api)
router.use('/project', project)

module.exports = router