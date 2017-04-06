const Sequelize = require('../config/sequelize.conf')
const UserModel = Sequelize.import('../models/user.model')
const Response = require('../utils/Response')
const util = require('util')

const login = async(req, res) => {
    try {

        req.checkBody('phone', '手机号不能为空').notEmpty()
        req.checkBody('password', '密码不能为空').notEmpty()

        // 检查参数
        const result = await req.getValidationResult()
        if (!result.isEmpty()) {
            Response.error(res, 500, util.inspect(result.array()))
            return
        }

        const phone = req.body.phone
        const password = req.body.password

        // 获取用户
        const user = await UserModel.findOne({
            where: {
                phone
            }
        })

        if (user) {
            if(user.get('password') === password) {
                Response.success(res)
            } else {
                Response.error(res, 500, '手机号密码错误')
            }
            return
        }

        Response.error(res, 500, '用户不存在')
    } catch (error) {
        Response.error(res, 500, error)
    }
}

module.exports = {
    login
}