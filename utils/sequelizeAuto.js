const SequelizeAuto = require('sequelize-auto');
const MysqlConfig = require('../config');
const fs = require("fs");

const auto = new SequelizeAuto(MysqlConfig.database, MysqlConfig.username, MysqlConfig.password, {
  host: MysqlConfig.host,
  dialect: 'mysql',
  output: '../models',
  additional: {
    timestamps: false
  },
  camel: true
})

const filePath = 'models';
auto.run((err) => {

  // 重命名models内的文件，命名改为驼峰式
  fs.readdir(filePath, function (err, files) {

    files.forEach(function (fileName) {

      const oldPath = filePath + '/' + fileName;
      const newPath = filePath + '/' + fileName.replace(/_([a-z])/g, ($0, $1) => {
        return $1.toUpperCase();
      }).replace(/([a-z])(\.js)/g, ($0, $1, $2) => {
        console.log($0, $1, $2)
        return $1 + '.model' + $2
      });

      // 如果重命名后的文件已存在，则删除
      if (fs.stat(newPath)) {

        fs.unlink(newPath, (err) => {
          console.log('deleteErr', err);
        });

      }

      // 重命名
      fs.rename(oldPath, newPath, function (err) {

        if (!err) {
          console.log(fileName + '重命名成功!');
        } else {
          console.log('renameErr', err);
        }

      })

    })
  })

  if (err) {
    throw err
  }

})