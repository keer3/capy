const express = require('express');
const router = express.Router();
const ApiCtrl = require('../controller/api.ctrl')

router.post('/addApi', ApiCtrl.addApi)

router.get('/getAllApi', ApiCtrl.getAllApi)
module.exports = router;