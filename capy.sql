/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50625
Source Host           : localhost:3306
Source Database       : capy

Target Server Type    : MYSQL
Target Server Version : 50625
File Encoding         : 65001

Date: 2017-04-12 22:53:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `api`
-- ----------------------------
DROP TABLE IF EXISTS `api`;
CREATE TABLE `api` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `status` varchar(20) DEFAULT '' COMMENT '接口状态',
  `url` varchar(100) DEFAULT '' COMMENT '接口地址',
  `type` varchar(10) NOT NULL DEFAULT '' COMMENT '请求方式',
  `dec` varchar(100) DEFAULT '' COMMENT '接口描述',
  `create_time` datetime DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_user` varchar(255) DEFAULT '' COMMENT '创建者',
  `update_user` varchar(0) DEFAULT '' COMMENT '更新者',
  `group_id` int(10) DEFAULT NULL COMMENT '接口所属分组',
  `protocol` varchar(20) DEFAULT '' COMMENT '协议',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api
-- ----------------------------

-- ----------------------------
-- Table structure for `api_group`
-- ----------------------------
DROP TABLE IF EXISTS `api_group`;
CREATE TABLE `api_group` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT '' COMMENT '分组名',
  `project_id` int(10) DEFAULT NULL COMMENT '分组所属项目',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api_group
-- ----------------------------

-- ----------------------------
-- Table structure for `api_header`
-- ----------------------------
DROP TABLE IF EXISTS `api_header`;
CREATE TABLE `api_header` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '请求头部标签',
  `content` text COMMENT '请求头部标签对应内容',
  `api_id` int(10) DEFAULT NULL COMMENT '请求头部所属接口',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api_header
-- ----------------------------

-- ----------------------------
-- Table structure for `api_params`
-- ----------------------------
DROP TABLE IF EXISTS `api_params`;
CREATE TABLE `api_params` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '参数名',
  `type` varchar(20) DEFAULT '' COMMENT '参数类型',
  `example` varchar(100) DEFAULT '' COMMENT '参数示例',
  `remark` varchar(100) DEFAULT '' COMMENT '参数备注说明',
  `value` varchar(200) DEFAULT '' COMMENT '参数值和值说明，json格式',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api_params
-- ----------------------------

-- ----------------------------
-- Table structure for `api_return`
-- ----------------------------
DROP TABLE IF EXISTS `api_return`;
CREATE TABLE `api_return` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '返回参数名',
  `required` int(2) NOT NULL COMMENT '是否必含该参数',
  `value` varchar(200) DEFAULT '' COMMENT '返回参数可能值，值说明，json格式',
  `success_return` text COMMENT '成功返回结果',
  `error_return` varchar(0) DEFAULT NULL COMMENT '失败返回结果',
  `api_id` int(10) DEFAULT NULL COMMENT '所属接口',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api_return
-- ----------------------------

-- ----------------------------
-- Table structure for `log`
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) DEFAULT '' COMMENT '操作方式',
  `username` varchar(20) DEFAULT '' COMMENT '操作人用户名',
  `project` int(10) DEFAULT NULL COMMENT '所属项目',
  `operation` varchar(20) DEFAULT '' COMMENT '操作方式',
  `desc` varchar(200) DEFAULT '' COMMENT '描述',
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of log
-- ----------------------------

-- ----------------------------
-- Table structure for `project`
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `dec` varchar(200) DEFAULT NULL,
  `version` varchar(15) DEFAULT NULL,
  `type` varchar(15) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_userId` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('1', 'CAPY协作', '项目描述', '1.0.0', 'nodejs', null, '2017-04-09 13:45:33', null);
INSERT INTO `project` VALUES ('2', '白板', '白板描述', '2.1.4', 'js', null, '2017-04-09 13:45:49', null);
INSERT INTO `project` VALUES ('3', '修改', '这是修改之后的描述', '3.0.1', null, null, '2017-04-09 15:20:29', null);
INSERT INTO `project` VALUES ('4', '修改', '这是修改之后的描述', null, null, null, '2017-04-09 15:24:43', null);
INSERT INTO `project` VALUES ('5', '鲁班', '成吉思汗', null, null, null, '2017-04-09 15:25:10', null);
INSERT INTO `project` VALUES ('6', '惨痛', '成吉思汗', null, null, null, '2017-04-09 15:26:55', null);
INSERT INTO `project` VALUES ('7', '惨痛', '成吉思汗', null, null, null, '2017-04-09 15:27:34', null);
INSERT INTO `project` VALUES ('8', '惨痛', '成吉思汗', null, null, null, '2017-04-09 15:29:23', '1');
INSERT INTO `project` VALUES ('9', '医学', '成吉思汗', null, null, null, '2017-04-09 15:29:42', '2');

-- ----------------------------
-- Table structure for `project_user`
-- ----------------------------
DROP TABLE IF EXISTS `project_user`;
CREATE TABLE `project_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL,
  `project_id` int(10) DEFAULT NULL,
  `role` varchar(255) DEFAULT '' COMMENT '角色',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project_user
-- ----------------------------
INSERT INTO `project_user` VALUES ('1', '1', '1', '');
INSERT INTO `project_user` VALUES ('2', '1', '2', '');
INSERT INTO `project_user` VALUES ('3', '1', '3', '');
INSERT INTO `project_user` VALUES ('4', '2', '1', '');
INSERT INTO `project_user` VALUES ('5', '2', '3', '');
INSERT INTO `project_user` VALUES ('6', '2', '2', '');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `phone` varchar(15) NOT NULL DEFAULT '',
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `realname` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '123', 'admin', 'admin', null, 'ssm', null);
INSERT INTO `user` VALUES ('2', '15588076508', 'sumi', 'new', 'ssmin3@163.com', null, null);
