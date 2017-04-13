const Sequelize = require('../config/sequelize.conf')
const Response = require('../utils/Response')
const Util = require('util')

const ApiModel = Sequelize.import('../models/api.model')
const ApiHeaderModel = Sequelize.import('../models/apiHeader.model')
const ApiParamsModel = Sequelize.import('../models/apiParams.model')
const ApiReturnModel = Sequelize.import('../models/apiReturn.model')

// 添加接口
const addApi = async(req, res) => {

}

// 项目的所有接口列表
const getAllApi = async(req, res) => {
  try {
    req.checkQuery('projectId', '项目ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const projectId = req.query.projectId
    const apiList = await ApiModel.findAll({
      where: {
        project_id: projectId
      }
    })

    if (!apiList) {
      Response.error(res, 500, '没有接口')
      return
    }
    Response.success(res, apiList)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 查看分组下的所有列表
const getApiByGroup = async(req, res) => {
  try {
    req.checkQuery('groupId', '分组ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const groupId = req.query.groupId
    const apiList = await ApiModel.findAll({
      where: {
        group_id: groupId
      }
    })

    if (!apiList) {
      Response.error(res, 500, '没有接口')
      return
    }
    Response.success(res, apiList)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

module.exports = {
  addApi,
  getAllApi,
  getApiByGroup
}