const express = require('express')
const router = express.Router();

var user = require('./user')
var api = require('./api')
var project = require('./project')
var apiGroup = require('./apiGroup')
var doc = require('./doc')

router.use('/user', user)
router.use('/api', api)
router.use('/project', project)
router.use('/apiGroup', apiGroup)
router.use('/doc', doc)

module.exports = router