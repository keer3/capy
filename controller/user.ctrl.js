const Sequelize = require('../config/sequelize.conf')
const UserModel = Sequelize.import('../models/user.model');
const UserCtrl = null;

const login = (req, res) => {

    // console.log('req', req.body)
    // const username = req.body.username;
    // const password = req.body.username;

    var username = 'admin'
    var password = 'admin'

    // 获取用户
    const user = UserModel.findOne({
        where: {
            username,
            password
        }
    }).then((ret) => {
        console.log('res', ret.dataValues)
        res.send(ret.dataValues);
    })
}

module.exports = {
    login
}