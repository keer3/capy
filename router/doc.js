const express = require('express');
const router = express.Router();

const DocCtrl = require('../controller/doc.ctrl')

router.post('/addDatabase', DocCtrl.addDatabase)

module.exports = router;