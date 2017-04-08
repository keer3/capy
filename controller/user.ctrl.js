const Sequelize = require('../config/sequelize.conf')
const UserModel = Sequelize.import('../models/user.model')
const Response = require('../utils/Response')
const Util = require('util')

const AlidayuConf = require('../config/alidayu.conf')
const Alidayu = require('alidayu-node')
const AlidayuApp = new Alidayu(AlidayuConf.appKey, AlidayuConf.appSecret)

const Moment = require('moment')

// 用户登陆
const login = async(req, res) => {
    try {

        req.checkBody('phone', '手机号不能为空').notEmpty()
        req.checkBody('password', '密码不能为空').notEmpty()

        // 检查参数
        const result = await req.getValidationResult()
        if (!result.isEmpty()) {
            Response.error(res, 500, Util.inspect(result.array()))
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
            if (user.get('password') === password) {
                // 储存登陆信息
                req.session.user = {
                    phone,
                    username: user.get('username')
                }
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



// 用户注册
const reg = async(req, res) => {
    try {
        req.checkBody('phone', '手机号不能为空').notEmpty()

        // 检查参数
        const result = await req.getValidationResult()
        if (!result.isEmpty()) {
            Response.error(res, 500, util.inspect(result.array()))
            return
        }

        const phone = req.body.phone

        const user = await UserModel.find({
            where: {
                phone
            }
        })

        if (user) {
            Response.error(res, 500, '用户已存在')
            return
        }






        res.send('end')

    } catch (error) {
        Response.error(res, 500, error)
    }
}

// 生成六位随机数
const randomNum = (length) => {
    return new Array(length).fill(0).map((x) => {
        return Math.floor(Math.random() * 10)
    }).join('')
}

// 生成验证码
const code = async(req, res) => {
    try {
        req.checkQuery('phone', '手机号不能为空').notEmpty()

        // 检查参数
        const result = await req.getValidationResult()
        if (!result.isEmpty()) {
            Response.error(res, 500, Util.inspect(result.array()))
            return
        }
        
        const phone = req.query.phone
        const code = randomNum(6)
        const messageParam = {
            sms_free_sign_name: 'CAPY协作',
            sms_param: JSON.stringify({
                "code": code,
            }),
            rec_num: phone,
            sms_template_code: AlidayuConf.smsTemplateCode
        }
        console.log(messageParam)
        // 调用阿里大于接口发送短信
        AlidayuApp.smsSend(messageParam, (err, res) => {
            if (!err) {
                Response.error(res, 500, error)
            }
        })

        // 保存验证码信息
        req.session.codeSession = {
            code,
            time: new Moment()
        }

        Response.success(res)
    } catch (error) {
        Response.error(res, 500, error)
    }
}

module.exports = {
    login,
    reg,
    code
}