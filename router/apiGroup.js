const express = require('express')
const router = express.Router()

const ApiGroupCtrl = require('../controller/apiGroup.ctrl')

router.post('/add', ApiGroupCtrl.addGroup)
router.post('/del', ApiGroupCtrl.delGroup)
router.post('/rename', ApiGroupCtrl.renameGroup)
router.get('/list', ApiGroupCtrl.getGroupList)

module.exports = router