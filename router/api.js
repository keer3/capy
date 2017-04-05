const express = require('express');
const router = express.Router();

const userCtrl = require('../controller/user.ctrl')

router.get('/api', function(req, res, next) {
  res.send('api');
});

router.get('/find', function(req, res, next) {
  res.send('find');
});

module.exports = router;