const Sequelize = require('sequelize')
const MysqlConf = require('../config')

const sequelize = new Sequelize(MysqlConf.database, MysqlConf.username, MysqlConf.password, {
  host: MysqlConf.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

module.exports = sequelize