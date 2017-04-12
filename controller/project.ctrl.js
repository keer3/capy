const Sequelize = require('../config/sequelize.conf')
const Response = require('../utils/Response')
const Util = require('util')

const ProjectModel = Sequelize.import('../models/project.model')
const UserModel = Sequelize.import('../models/user.model')
const ProjectUserModel = Sequelize.import('../models/projectUser.model')

// 查询用户拥有的项目
const findProjectListByUser = async(req, res) => {
  try {
    req.checkQuery('userId', '用户ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const userId = req.query.userId
    const projectUserList = await ProjectUserModel.findAll({
      attributes: ['project_id'],
      where: {
        user_id: userId
      }
    })

    var projectIdList = []
    for (var project of projectUserList) {
      projectIdList.push(project.project_id)
    }

    const projectList = await ProjectModel.findAll({
      where: {
        id: {
          $in: projectIdList
        }
      }
    })

    if (!projectList) {
      Response.error(res, 500, '没有项目')
      return
    }
    Response.success(res, projectList)
  } catch (error) {
    Response.error(res, 500, error)
  }

}

// 查询项目协作者
const findUserListByProject = async(req, res) => {
  try {
    req.checkQuery('projectId', '项目ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const projectId = req.query.projectId
    const userProjectList = await ProjectUserModel.findAll({
      where: {
        project_id: projectId
      }
    })

    var userIdList = []
    for (var userProject of userProjectList) {
      userIdList.push(userProject.user_id)
    }

    const userList = await UserModel.findAll({
      attributes: ['username', 'phone', 'realname', 'email'],
      where: {
        id: {
          $in: userIdList
        }
      }
    })

    if (!userList) {
      Response.error(res, 500, '没有用户')
      return
    }
    Response.success(res, userList)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 添加项目协作者
const addUserToProject = async(req, res) => {
  try {
    req.checkBody('projectId', '项目ID不能为空').notEmpty()
    req.checkBody('userId', '用户ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const projectId = req.body.projectId
    const userId = req.body.userId

    const projectUser = await ProjectUserModel.create({
      user_id: userId,
      project_id: projectId
    })

    if (!projectUser) {
      Response.error(res, 500, '添加失败，请重试')
      return
    }

    Response.success(res)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 查看项目详情
const getProjectInfo = async(req, res) => {
  try {
    req.checkQuery('projectId', '项目ID不能为空').notEmpty()
    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const projectId = req.query.projectId
    const project = await ProjectModel.findOne({
      where: {
        id: projectId
      }
    })

    const users = await ProjectUserModel.count({
      where: {
        project_id: projectId
      }
    })

    var projectInfo = project.get()
    projectInfo.users = users

    if (!projectInfo) {
      Response.error(res, 500, '未找到该项目')
      return
    }
    Response.success(res, projectInfo)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 修改项目详情
const updateProjectInfo = async(req, res) => {
  try {
    req.checkBody('projectId', '项目ID不能为空').notEmpty()
    req.checkBody('name', '项目名不能为空').notEmpty()
    req.checkBody('createUserId', '创建者ID不能为空').notEmpty()

    // 检查参数
    var result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const {
      projectId,
      name,
      dec,
      version,
      type,
      createUserId
    } = req.body

    const projectParam = {
      name,
      dec,
      version,
      type,
      create_userId: createUserId
    }

    result = ProjectModel.update(projectParam, {
      where: {
        id: projectId
      }
    })

    if (!result) {
      Response.error(res, 500, '修改失败，请重试')
      return
    }
    Response.success(res)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 添加项目
const addProject = async(req, res) => {
  try {
    req.checkBody('name', '项目名不能为空').notEmpty()
    req.checkBody('createUserId', '创建者ID不能为空').notEmpty()

    // 检查参数
    var result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const {
      name,
      dec,
      version,
      type,
      createUserId
    } = req.body

    const projectParam = {
      name,
      dec,
      version,
      type,
      create_userId: createUserId
    }

    result = ProjectModel.create(projectParam)
    if (!result) {
      Response.error(res, 500, '添加失败，请重试')
      return
    }
    Response.success(res)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 删除项目
const delProject = async(req, res) => {
  try {
    req.checkBody('projectId', '项目ID不能为空').notEmpty()

    // 检查参数
    var result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const projectId = req.body.projectId
    await ProjectModel.destroy({
      where: {
        id: projectId
      }
    })

    Response.success(res)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

module.exports = {
  findProjectListByUser,
  findUserListByProject,
  addUserToProject,
  getProjectInfo,
  updateProjectInfo,
  addProject,
  delProject
}