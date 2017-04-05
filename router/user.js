const express = require('express');
const router = express.Router();

const UserCtrl = require('../controller/user.ctrl')

router.get('/login', UserCtrl.login)

router.get('/reg', function(req, res, next) {
  res.send('reg');
})

router.get('/findUser', function(req, res, next) {
  res.send('findUser');
});

module.exports = router;