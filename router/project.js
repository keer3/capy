const express = require('express')
const router = express.Router()

const ProjectCtrl = require('../controller/project.ctrl')

router.get('/findProjectByUser', ProjectCtrl.findProjectListByUser)

router.get('/findUserByProject', ProjectCtrl.findUserListByProject)

router.post('/addUserToProject', ProjectCtrl.addUserToProject)

router.get('/getProjectInfo', ProjectCtrl.getProjectInfo)

router.post('/updateProjectInfo', ProjectCtrl.updateProjectInfo)

module.exports = router