const Sequelize = require('../config/sequelize.conf')
const Response = require('../utils/Response')
const Util = require('util')

const ApiGroupModel = Sequelize.import('../models/apiGroup.model')
const ApiModel = Sequelize.import('../models/api.model')
const ApiHeaderModel = Sequelize.import('../models/apiHeader.model')
const ApiParamsModel = Sequelize.import('../models/apiParams.model')
const APiReturnModel = Sequelize.import('../models/apiReturn.model')

// 添加分组
const addGroup = async(req, res) => {
  try {
    req.checkBody('projectId', '项目ID不能为空').notEmpty()
    req.checkBody('name', '分组名不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const projectId = req.body.projectId
    const name = req.body.name

    const group = await ApiGroupModel.create({
      name,
      project_id: projectId
    })

    if (!group) {
      Response.error(res, 500, '创建失败，请重试')
      return
    }
    Response.success(res, group)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 删除接口分组
const delGroup = async(req, res) => {
  try {
    req.checkBody('groupId', '接口分组ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const groupId = req.body.groupId
    await ApiGroupModel.destroy({
      where: {
        id: groupId
      }
    })

    // 得到分组下的所有接口ID
    const apiList = await ApiModel.findAll({
      where: {
        group_id: groupId
      }
    })

    var apiIdList = []
    for (var api of apiList) {
      apiIdList.push(api.id)
    }

    // 删除分组下的所有接口
    await ApiModel.destroy({
      where: {
        group_id: groupId
      }
    })

    // 删除接口关联的请求头
    await ApiHeaderModel.destroy({
      where: {
        api_id: {
          $in: apiIdList
        }
      }
    })

    // 删除接口关联的请求参数
    await ApiParamsModel.destroy({
      where: {
        api_id: {
          $in: apiIdList
        }
      }
    })

    // 删除接口关联的返回结果
    await APiReturnModel.destroy({
      where: {
        api_id: {
          $in: apiIdList
        }
      }
    })

    Response.success(res, apiIdList)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 重命名分组
const renameGroup = async(req, res) => {
  try {
    req.checkBody('groupId', '接口分组ID不能为空').notEmpty()
    req.checkBody('name', '接口名不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const groupId = req.body.groupId
    const name = req.body.name

    const group = await ApiGroupModel.update({
      name
    }, {
      where: {
        id: groupId
      }
    })

    if (!group) {
      Response.error(res, 500, '修改失败，请重试')
      return
    }
    Response.success(res)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 查看项目接口分组列表
const getGroupList = async(req, res) => {
  try {
    req.checkQuery('projectId', '项目ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const projectId = req.query.projectId
    const projectList = await ApiGroupModel.findAll({
      where: {
        project_id: projectId
      }
    })

    if(!projectList) {
      Response.error(res, 500, '暂时没有分组信息')
      return
    }
    Response.success(res, projectList)

  } catch (error) {
    Response.error(res, 500, error)
  }
}

module.exports = {
  addGroup,
  delGroup,
  renameGroup,
  getGroupList
}