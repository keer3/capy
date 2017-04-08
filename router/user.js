const express = require('express')
const router = express.Router()

const UserCtrl = require('../controller/user.ctrl')

router.post('/login', UserCtrl.login)

router.post('/reg', UserCtrl.reg)

router.get('/logout', UserCtrl.logout)

router.get('/code', UserCtrl.code)

router.get('/findUser', UserCtrl.findUserByPhone)

module.exports = router