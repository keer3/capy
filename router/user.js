const express = require('express')
const router = express.Router()

const UserCtrl = require('../controller/user.ctrl')

router.post('/login', UserCtrl.login)

router.post('/reg', UserCtrl.reg)

router.get('/code', UserCtrl.code)

router.get('/findUser', function (req, res, next) {
  res.send('findUser')
})

module.exports = router