const express = require('express')
const router = express.Router()

const UserCtrl = require('../controller/user.ctrl')

router.post('/login', UserCtrl.login)

router.post('/reg', function (req, res, next) {
  res.send('111' + req.body.user)
})

router.get('/findUser', function (req, res, next) {
  res.send('findUser')
})

module.exports = router