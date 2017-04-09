const Sequelize = require('../config/sequelize.conf')
const Response = require('../utils/Response')
const Util = require('util')

const ProjectModel = Sequelize.import('../models/project.model')
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

module.exports = {
  findProjectListByUser
}