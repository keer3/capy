const express = require('express');
const router = express.Router();
const ApiCtrl = require('../controller/api.ctrl')

router.post('/addApi', ApiCtrl.addApi)

router.get('/getAllApi', ApiCtrl.getAllApi)

router.get('/getApiByGroup', ApiCtrl.getApiByGroup)

router.post('/delApi', ApiCtrl.delApi)

router.get('/getApiDetail', ApiCtrl.getApiDetail)

module.exports = router;