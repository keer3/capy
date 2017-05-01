const express = require('express');
const router = express.Router();

const DocCtrl = require('../controller/doc.ctrl')

router.post('/addDB', DocCtrl.addDatabase)
router.post('/delDB', DocCtrl.delDatabase)
router.post('/updateDB', DocCtrl.updateDatabase)

module.exports = router;