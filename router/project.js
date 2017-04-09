const express = require('express')
const router = express.Router()

const ProjectCtrl = require('../controller/project.ctrl')

router.get('/findProjectByUser', ProjectCtrl.findProjectListByUser)

module.exports = router