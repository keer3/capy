const Sequelize = require('../config/sequelize.conf')
const Response = require('../utils/Response')
const Util = require('util')

const ProjectModel = Sequelize.import('../models/project.model')
const UserModel = Sequelize.import('../models/user.model')
const ProjectUserModel = Sequelize.import('../models/projectUser.model')
const ApiModel = Sequelize.import('../models/api.model')

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
      attributes: ['id', 'username', 'phone', 'realname', 'email'],
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

    // 查看用户是否已加入该项目
    const exist = await ProjectUserModel.findOne({
      where: {
        user_id: userId,
        project_id: projectId
      }
    })

    if (exist) {
      Response.error(res, 500, '用户已加入该项目！')
      return
    }

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

// 移除项目协作者
const delUserToProject = async(req, res) => {
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

    await ProjectUserModel.destroy({
      where: {
        user_id: userId,
        project_id: projectId
      }
    })
    
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

    // 项目协作者人数
    const users = await ProjectUserModel.count({
      where: {
        project_id: projectId
      }
    })

    // 项目所含接口数量
    const apis = await ApiModel.count({
      where: {
        project_id: projectId
      }
    })

    // 创建者姓名
    const user = await UserModel.findOne({
      attributes: ['username', 'phone'],
      where: {
        id: project.create_userId
      }
    })

    var projectInfo = project.get()
    projectInfo.userCount = users
    projectInfo.apiCount = apis
    projectInfo.create_user = user.get()

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
      type
    }

    result = await ProjectModel.update(projectParam, {
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

    result = await ProjectModel.create(projectParam)
    if (!result) {
      Response.error(res, 500, '添加失败，请重试')
      return
    }

    // 建立创建者和项目的关系
    await ProjectUserModel.create({
      user_id: createUserId,
      project_id: result.id
    })

    Response.success(res, result)
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

    // 删除项目
    await ProjectModel.destroy({
      where: {
        id: projectId
      }
    })

    // 删除项目与关联人员
    await ProjectUserModel.destroy({
      where: {
        project_id: projectId
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
  delUserToProject,
  getProjectInfo,
  updateProjectInfo,
  addProject,
  delProject
}