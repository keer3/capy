const express = require('express')
const router = express.Router()

const ApiGroupCtrl = require('../controller/apiGroup.ctrl')

router.post('/add', ApiGroupCtrl.addGroup)

module.exports = router