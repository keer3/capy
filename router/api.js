const express = require('express');
const router = express.Router();
const ApiCtrl = require('../controller/api.ctrl')

router.post('/addApi', ApiCtrl.addApi)

router.get('/getAllApi', ApiCtrl.getAllApi)

router.get('/getApiByGroup', ApiCtrl.getApiByGroup)

module.exports = router;