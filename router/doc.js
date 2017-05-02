const express = require('express');
const router = express.Router();

const DocCtrl = require('../controller/doc.ctrl')

router.post('/addDB', DocCtrl.addDatabase)
router.post('/delDB', DocCtrl.delDatabase)
router.post('/updateDB', DocCtrl.updateDatabase)
router.get('/listDB', DocCtrl.listDatabase)

router.post('/addTable', DocCtrl.addTable)
router.post('/updateTable', DocCtrl.updateTable)
router.post('/delTable', DocCtrl.delTable)

module.exports = router;