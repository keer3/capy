const Sequelize = require('../config/sequelize.conf')
const Response = require('../utils/Response')
const Util = require('util')

const ApiModel = Sequelize.import('../models/api.model')
const ApiHeaderModel = Sequelize.import('../models/apiHeader.model')
const ApiParamsModel = Sequelize.import('../models/apiParams.model')
const ApiReturnModel = Sequelize.import('../models/apiReturn.model')

// 添加接口
const addApi = async(req, res) => {
  try {

    req.checkBody('groupId', '分组ID不能为空').notEmpty()
    req.checkBody('projectId', '项目ID不能为空').notEmpty()
    req.checkBody('status', '项目ID不能为空').notEmpty()
    req.checkBody('protocol', '请求协议不能为空').notEmpty()
    req.checkBody('type', '请求方式不能为空').notEmpty()
    req.checkBody('url', 'URL不能为空').notEmpty()
    req.checkBody('name', '接口名称不能为空').notEmpty()
    req.checkBody('userId', '创建者ID不能为空').notEmpty()


    // 检查参数
    var result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const {
      groupId,
      projectId,
      status,
      protocol,
      type,
      url,
      name,
      dec,
      successReturn,
      errorReturn,
      apiHeader,
      apiParams,
      apiReturn,
      userId
    } = req.body

    var api = await ApiModel.create({
      group_id: groupId,
      status,
      name,
      url,
      type,
      dec,
      protocol,
      project_id: projectId,
      create_userId: userId,
      success_return: successReturn,
      error_return: errorReturn,
    })

    const apiId = api.get('id')

    // 添加接口请求头
    var headerList = JSON.parse(apiHeader)
    headerList.forEach((header) => {
      header.api_id = apiId
    })
    await ApiHeaderModel.bulkCreate(headerList)
    api.header = headerList

    // 添加接口请求参数
    var paramsList = JSON.parse(apiParams)
    paramsList.forEach((params) => {
      params.api_id = apiId
      params.value = JSON.stringify(params.value)
    })
    await ApiParamsModel.bulkCreate(paramsList)
    api.params = paramsList

    // 添加接口返回结果
    var returnList = JSON.parse(apiReturn)
    returnList.forEach((ret) => {
      ret.api_id = apiId
      ret.value = JSON.stringify(ret.value)
    })
    await ApiReturnModel.bulkCreate(returnList)
    api.return = returnList

    if (!api) {
      Response.error(res, 500, '接口添加失败，请重试')
      return
    }
    Response.success(res, api)
  } catch (error) {
    Response.error(res, 500, error)
  }
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

// 删除接口
const delApi = async (req, res) => {
  try {

    req.checkBody('apiId', '接口ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const apiId = req.body.apiId
    // 删除API基本信息
    await ApiModel.destroy({
      where: {
        id: apiId
      }
    })

    // 删除API请求头部信息
    await ApiHeaderModel.destroy({
      where: {
        api_id: apiId
      }
    })

    // 删除API请求参数信息
    await ApiParamsModel.destroy({
      where: {
        api_id: apiId
      }
    })

    // 删除API返回值信息
    await ApiReturnModel.destroy({
      where: {
        api_id: apiId
      }
    })

    Response.success(res)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

module.exports = {
  addApi,
  getAllApi,
  getApiByGroup,
  delApi
}