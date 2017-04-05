const Sequelize = require('../config/sequelize.conf')
const UserModel = Sequelize.import('../models/user.model');
const UserCtrl = null;

const login = (req, res) => {

    // const username = req.body.username;
    // const password = req.body.username;

    // // 获取用户
    // const user = UserModel.findOne({
    //   where: {
    //     username,
    //     password
    //   }
    // })

    console.log('result')

    res.send('respond with a resource');
}

module.exports = {
    login
}