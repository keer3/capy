const Sequelize = require('../config/sequelize.conf')
const Response = require('../utils/Response')
const Util = require('util')

const ApiGroupModel = Sequelize.import('../models/apiGroup.model')

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

    if (!group){
      Response.error(res, 500, '创建失败，请重试')
      return
    }
    Response.success(res, group)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

module.exports = {
  addGroup
}