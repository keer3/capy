const Sequelize = require('../config/sequelize.conf')
const Response = require('../utils/Response')
const Util = require('util')

const DocDatabaseModel = Sequelize.import('../models/docDataDatabase.model')
const DocTableModel = Sequelize.import('../models/docDataTable.model')
const DocFieldModel = Sequelize.import('../models/docDataField.model')

// 添加数据库
const addDatabase = async(req, res) => {
  try {
    req.checkBody('name', '数据库名不能为空').notEmpty()
    req.checkBody('projectId', '所属项目ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const {
      name,
      version,
      dec,
      projectId
    } = req.body

    const database = await DocDatabaseModel.create({
      name,
      version,
      dec,
      project_id: projectId
    })
    if (!database) {
      Response.error(res, 500, '创建失败，请重试')
      return
    }
    Response.success(res, database)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 删除数据库
const delDatabase = async(req, res) => {
  try {
    req.checkBody('databaseId', '数据库ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const databaseId = req.body.databaseId
    await DocDatabaseModel.destroy({
      where: {
        id: databaseId
      }
    })

    // 删除数据库下的所有数据表
    await DocTableModel.destroy({
      where: {
        database_id: databaseId
      }
    })

    // 得到所有数据表的ID
    const tableList = await DocTableModel.findAll({
      where: {
        database_id: databaseId
      }
    })
    let tableIdList = tableList.map((table) => {
      return table.get('id')
    })

    // 删除数据表下的所有字段
    await DocFieldModel.destroy({
      where: {
        table_id: {
          $in: tableIdList
        }
      }
    })

    Response.success(res)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 编辑数据库信息
const updateDatabase = async(req, res) => {
  try {
    req.checkBody('name', '数据库名不能为空').notEmpty()
    req.checkBody('projectId', '所属项目ID不能为空').notEmpty()
    req.checkBody('dbId', '数据库ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const {
      name,
      version,
      dec,
      projectId,
      dbId
    } = req.body

    const database = await DocDatabaseModel.update({
      name,
      version,
      dec,
      project_id: projectId
    }, {
      where: {
        id: dbId
      }
    })
    if (!database) {
      Response.error(res, 500, '创建失败，请重试')
      return
    }
    Response.success(res, database)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 查找该项目下的数据库列表
const listDatabase = async(req, res) => {
  try {
    req.checkQuery('projectId', '项目ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const project_id = req.query.projectId
    const dbList = await DocDatabaseModel.findAll({
      where: {
        project_id
      }
    })
    if (!dbList) {
      Response.error(res, 500, '没有数据库信息')
      return
    }
    Response.success(res, dbList)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 添加数据表
const addTable = async(req, res) => {
  try {
    req.checkBody('databaseId', '数据库ID不能为空').notEmpty()
    req.checkBody('name', '表名不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const {
      databaseId,
      name,
      dec
    } = req.body

    const table = await DocTableModel.create({
      database_id: databaseId,
      name,
      dec
    })

    if (!table) {
      Response.error(res, 500, '添加失败，请重试！')
      return
    }

    Response.success(res, table)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 编辑数据表
const updateTable = async(req, res) => {
  try {
    req.checkBody('databaseId', '数据库ID不能为空').notEmpty()
    req.checkBody('name', '表名不能为空').notEmpty()
    req.checkBody('tableId', '数据表ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const {
      databaseId,
      name,
      dec,
      tableId
    } = req.body

    const table = await DocTableModel.update({
      database_id: databaseId,
      name,
      dec
    }, {
      where: {
        id: tableId
      }
    })

    if (!table) {
      Response.error(res, 500, '更新失败，请重试！')
      return
    }

    Response.success(res, table)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 删除数据表
const delTable = async(req, res) => {
  try {
    req.checkBody('tableId', '数据表ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const tableId = req.body.tableId
    await DocTableModel.destroy({
      where: {
        id: tableId
      }
    })

    // 删除数据表下的所有字段
    await DocFieldModel.destroy({
      where: {
        table_id: tableId
      }
    })

    Response.success(res)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 查看数据库下的数据表
const listTable = async(req, res) => {
  try {
    req.checkQuery('databaseId', '数据库ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const databaseId = req.query.databaseId
    const tableList = await DocTableModel.findAll({
      where: {
        database_id: databaseId
      }
    })

    if (!tableList) {
      Response.error(res, 500, '暂无数据表信息！')
      return
    }
    Response.success(res, tableList)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 添加字段
const addField = async(req, res) => {
  try {
    req.checkBody('tableId', '数据表ID不能为空').notEmpty()
    req.checkBody('name', '字段名不能为空').notEmpty()
    req.checkBody('type', '字段类型不能为空').notEmpty()
    req.checkBody('length', '字段长度不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()

    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const {
      tableId,
      name,
      type,
      length,
      primary,
      must,
      defaultValue,
      dec
    } = req.body

    const field = await DocFieldModel.create({
      table_id: tableId,
      name,
      type,
      length,
      primary,
      must,
      default_value: defaultValue,
      dec
    })

    if (!field) {
      Response.error(res, 500, '添加失败，请重试！')
      return
    }

    Response.success(res, field)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 编辑字段
const updateField = async(req, res) => {
  try {
    req.checkBody('fieldId', '字段ID不能为空').notEmpty()
    req.checkBody('tableId', '数据表ID不能为空').notEmpty()
    req.checkBody('name', '字段名不能为空').notEmpty()
    req.checkBody('type', '字段类型不能为空').notEmpty()
    req.checkBody('length', '字段长度不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()

    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const {
      fieldId,
      tableId,
      name,
      type,
      length,
      primary,
      must,
      defaultValue,
      dec
    } = req.body

    const field = await DocFieldModel.update({
      table_id: tableId,
      name,
      type,
      length,
      primary,
      must,
      default_value: defaultValue,
      dec
    }, {
      where: {
        id: fieldId
      }
    })

    if (!field) {
      Response.error(res, 500, '更新失败，请重试！')
      return
    }

    Response.success(res, field)

  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 删除字段
const delField = async(req, res) => {
  try {
    req.checkBody('fieldId', '字段ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const fieldId = req.body.fieldId
    await DocFieldModel.destroy({
      where: {
        id: fieldId
      }
    })

    Response.success(res)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 查看字段详情
const detailField = async(req, res) => {
  try {
    req.checkQuery('fieldId', '字段ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const fieldId = req.query.fieldId
    const field = await DocFieldModel.findOne({
      where: {
        id: fieldId
      }
    })

    if (!field) {
      Response.error(res, 500, '暂无字段信息！')
      return
    }
    Response.success(res, field)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

// 查看表中的所有字段
const listField = async(req, res) => {
  try {
    req.checkQuery('tableId', '数据表ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const tableId = req.query.tableId
    const fieldList = await DocFieldModel.findAll({
      where: {
        table_id: tableId
      }
    })

    if (!fieldList) {
      Response.error(res, 500, '暂无字段信息！')
      return
    }
    Response.success(res, fieldList)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

module.exports = {
  addDatabase,
  delDatabase,
  updateDatabase,
  listDatabase,
  addTable,
  updateTable,
  delTable,
  listTable,
  addField,
  updateField,
  delField,
  detailField,
  listField
}