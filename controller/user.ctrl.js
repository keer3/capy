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
        req.checkBody('password', '密码不能为空').notEmpty()
        req.checkBody('code', '验证码不能为空').notEmpty()
        // 检查参数
        var result = await req.getValidationResult()
        if (!result.isEmpty()) {
            Response.error(res, 500, Util.inspect(result.array()))
            return
        }

        const phone = req.body.phone
        const password = req.body.password
        const code = req.body.code

        // 判断用户是否存在
        const userExist = await UserModel.find({
            where: {
                phone
            }
        })
        if (userExist) {
            Response.error(res, 500, '用户已存在')
            return
        }

        // 判断验证码是否失效
        const codeSession = req.session.codeSession
        if (!new Moment().isBetween(codeSession.time, new Moment(codeSession.time).add(30, 'minutes')) || code !== codeSession.code) {
            Response.error(res, 500, '验证码错误')
            return
        }

        // 添加用户
        result = await UserModel.create({
            phone,
            password
        })

        if (result) {
            req.session.user = {
                phone
            }
            Response.success(res)
            return
        }
        Response.error(res, 500, '注册失败，请重试')
    } catch (error) {
        Response.error(res, 500, error)
    }
}

// 注销用户
const logout = async(req, res) => {
    req.session.user = null
    Response.success(res)
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

// 根据手机号查找用户
const findUserByPhone = async(req, res) => {
    try {
        req.checkQuery('phone', '手机号不能为空').notEmpty()

        // 检查参数
        const result = await req.getValidationResult()
        if (!result.isEmpty()) {
            Response.error(res, 500, Util.inspect(result.array()))
            return
        }

        const phone = req.query.phone
        const user = await UserModel.findOne({
            attributes: ['username', 'phone'],
            where: {
                phone
            }
        })

        if (!user) {
            Response.error(res, 500, '用户不存在')
            return
        }
        Response.success(res, user.toJSON())
    } catch (error) {
        Response.error(res, 500, error)
    }
}

// 修改密码
const changePsd = async(req, res) => {
    try {
        req.checkBody('phone', '手机号不能为空').notEmpty()
        req.checkBody('oldPassword', '密码不能为空').notEmpty()
        req.checkBody('newPassword', '新密码不能为空').notEmpty()
        req.checkBody('code', '验证码不能为空').notEmpty()
        // 检查参数
        var result = await req.getValidationResult()
        if (!result.isEmpty()) {
            Response.error(res, 500, Util.inspect(result.array()))
            return
        }

        // 判断验证码是否失效
        const codeSession = req.session.codeSession
        if (!new Moment().isBetween(codeSession.time, new Moment(codeSession.time).add(30, 'minutes')) || code !== codeSession.code) {
            Response.error(res, 500, '验证码错误')
            return
        }

        const {
            phone,
            oldPassword,
            newPassword
        } = req.body

        const user = await UserModel.findOne({
            where: {
                phone
            }
        })

        if (user.get('password') !== oldPassword) {
            Response.error(res, 500, '密码错误')
            return
        }

        result = UserModel.update({
            password: newPassword
        }, {
            where: {
                phone
            }
        })

        if(!result) {
            Response.error(res, 500, '修改失败，请重试')
            return
        }
        Response.success(res)
    } catch (error) {
        Response.error(res, 500, error)
    }
}

module.exports = {
    login,
    reg,
    logout,
    code,
    findUserByPhone,
    changePsd
}