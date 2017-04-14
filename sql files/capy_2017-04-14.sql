# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.17)
# Database: capy
# Generation Time: 2017-04-14 11:10:46 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table api
# ------------------------------------------------------------

DROP TABLE IF EXISTS `api`;

CREATE TABLE `api` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `status` varchar(20) DEFAULT '' COMMENT '接口状态',
  `name` varchar(100) DEFAULT NULL COMMENT '接口名称',
  `url` varchar(100) DEFAULT '' COMMENT '接口地址',
  `type` varchar(10) NOT NULL DEFAULT '' COMMENT '请求方式',
  `dec` varchar(100) DEFAULT '' COMMENT '接口描述',
  `protocol` varchar(20) DEFAULT NULL COMMENT '协议',
  `project_id` int(10) DEFAULT NULL COMMENT '接口所属项目',
  `group_id` int(10) DEFAULT NULL COMMENT '接口所属分组',
  `create_time` datetime DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_userId` int(10) DEFAULT NULL COMMENT '创建者ID',
  `update_userId` int(10) DEFAULT NULL COMMENT '更新者ID',
  `success_return` text COMMENT '返回成功示例',
  `error_return` text COMMENT '返回失败示例',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `api` WRITE;
/*!40000 ALTER TABLE `api` DISABLE KEYS */;

INSERT INTO `api` (`id`, `status`, `name`, `url`, `type`, `dec`, `protocol`, `project_id`, `group_id`, `create_time`, `update_time`, `create_userId`, `update_userId`, `success_return`, `error_return`)
VALUES
	(5,'1','添加接口','http://localhost:8888/api/addApi','post','','https',1,3,NULL,'2017-04-13 15:30:10',2,NULL,NULL,NULL),
	(7,'1','添加接口','http://localhost:8888/api/addApi','post','','https',1,3,NULL,'2017-04-13 16:39:58',2,NULL,NULL,NULL),
	(8,'1','更新接口','http://localhost:8888/api/addApi','post','','https',1,1,NULL,'2017-04-14 19:09:29',2,2,NULL,NULL),
	(9,'1','添加接口','http://localhost:8888/api/addApi','post','','https',1,3,NULL,'2017-04-13 18:19:05',2,NULL,NULL,NULL),
	(10,'1','添加接口','http://localhost:8888/api/addApi','post','','https',1,3,NULL,'2017-04-13 18:22:31',2,NULL,NULL,NULL),
	(11,'1','添加接口','http://localhost:8888/api/addApi','post','','https',1,3,NULL,'2017-04-13 18:23:30',2,NULL,NULL,NULL),
	(12,'1','添加接口','http://localhost:8888/api/addApi','post','','https',1,3,NULL,'2017-04-14 19:06:58',2,NULL,NULL,NULL);

/*!40000 ALTER TABLE `api` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table api_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `api_group`;

CREATE TABLE `api_group` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT '' COMMENT '分组名',
  `project_id` int(10) DEFAULT NULL COMMENT '分组所属项目',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `api_group` WRITE;
/*!40000 ALTER TABLE `api_group` DISABLE KEYS */;

INSERT INTO `api_group` (`id`, `name`, `project_id`)
VALUES
	(1,'用户',1),
	(3,'测试',1);

/*!40000 ALTER TABLE `api_group` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table api_header
# ------------------------------------------------------------

DROP TABLE IF EXISTS `api_header`;

CREATE TABLE `api_header` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '请求头部标签',
  `content` text COMMENT '请求头部标签对应内容',
  `api_id` int(10) DEFAULT NULL COMMENT '请求头部所属接口',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `api_header` WRITE;
/*!40000 ALTER TABLE `api_header` DISABLE KEYS */;

INSERT INTO `api_header` (`id`, `name`, `content`, `api_id`)
VALUES
	(1,'accept-ranges','bytes',5),
	(2,'accept-ranges','hello',5),
	(3,'accept-ranges','bytes',7),
	(4,'accept-ranges','hello',7),
	(5,'accept-ranges','bytes',5),
	(6,'accept-ranges','hello',5),
	(7,'accept-ranges','bytes',5),
	(8,'accept-ranges','hello',5),
	(9,'accept-ranges','bytes',5),
	(13,'accept-ranges','bytes',4),
	(16,'accept-ranges','hello',5),
	(17,'accept-ranges','bytes',5),
	(18,'accept-ranges','hello',5),
	(19,'accept-ranges','bytes',5),
	(20,'accept-ranges','hello',5),
	(21,'accept-ranges','bytes',5),
	(22,'accept-ranges','hello',5),
	(23,'accept-ranges','bytes',5),
	(24,'accept-ranges','hello',5),
	(25,'accept-ranges','bytes',5),
	(26,'accept-ranges','hello',5),
	(27,'accept-ranges','bytes',5),
	(28,'accept-ranges','hello',5),
	(29,'accept-ranges','bytes',5),
	(30,'accept-ranges','hello',5),
	(31,'accept-ranges','bytes',5),
	(32,'accept-ranges','hello',5),
	(33,'accept-ranges','bytes',5),
	(34,'accept-ranges','hello',5),
	(35,'accept-ranges','bytes',5),
	(36,'accept-ranges','hello',5),
	(37,'accept-ranges','bytes',5),
	(38,'accept-ranges','hello',5),
	(39,'accept-ranges','bytes',5),
	(40,'accept-ranges','hello',5),
	(41,'accept-ranges','bytes',5),
	(42,'accept-ranges','hello',5),
	(43,'accept-ranges','bytes',5),
	(44,'accept-ranges','hello',5),
	(45,'accept-ranges','bytes',5),
	(46,'accept-ranges','hello',5),
	(47,'accept-ranges','bytes',5),
	(48,'accept-ranges','hello',5),
	(49,'accept-ranges','bytes',5),
	(50,'accept-ranges','hello',5),
	(51,'accept-ranges','bytes',5),
	(52,'accept-ranges','hello',5),
	(53,'accept-ranges','bytes',5),
	(54,'accept-ranges','hello',5),
	(55,'accept-ranges','bytes',5),
	(56,'accept-ranges','hello',5),
	(57,'accept-ranges','bytes',5),
	(58,'accept-ranges','hello',5),
	(61,'accept-ranges','bytes',9),
	(62,'accept-ranges','hello',9),
	(63,'accept-ranges','bytes',10),
	(64,'accept-ranges','hello',10),
	(65,'accept-ranges','bytes',11),
	(66,'accept-ranges','hello',11),
	(67,'accept-ranges','bytes',12),
	(68,'accept-ranges','hello',12),
	(75,'accept-ranges','bytes',8),
	(76,'accept-ranges','hello',8);

/*!40000 ALTER TABLE `api_header` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table api_params
# ------------------------------------------------------------

DROP TABLE IF EXISTS `api_params`;

CREATE TABLE `api_params` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '参数名',
  `type` varchar(20) DEFAULT '' COMMENT '参数类型',
  `example` varchar(100) DEFAULT '' COMMENT '参数示例',
  `dec` varchar(100) DEFAULT '' COMMENT '参数说明',
  `value` varchar(200) DEFAULT '' COMMENT '参数值和值说明，json格式',
  `must` int(2) DEFAULT NULL COMMENT '是否必须',
  `limit` varchar(100) DEFAULT NULL COMMENT '参数限制',
  `api_id` int(10) DEFAULT NULL COMMENT '所属接口ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `api_params` WRITE;
/*!40000 ALTER TABLE `api_params` DISABLE KEYS */;

INSERT INTO `api_params` (`id`, `name`, `type`, `example`, `dec`, `value`, `must`, `limit`, `api_id`)
VALUES
	(1,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',5),
	(2,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',5),
	(3,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',5),
	(6,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',4),
	(10,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',5),
	(11,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',5),
	(12,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',5),
	(13,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',5),
	(14,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',5),
	(15,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',5),
	(16,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',5),
	(17,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',5),
	(18,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',5),
	(20,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',9),
	(21,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',10),
	(22,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',11),
	(23,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',12),
	(27,'username','string','admin','用户姓名','[{\"value\":1,\"dec\":\"错误的时候\"}]',1,'邮箱地址',8);

/*!40000 ALTER TABLE `api_params` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table api_return
# ------------------------------------------------------------

DROP TABLE IF EXISTS `api_return`;

CREATE TABLE `api_return` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '返回参数名',
  `must` int(2) NOT NULL COMMENT '是否必含该参数',
  `value` varchar(200) DEFAULT '' COMMENT '返回参数可能值，值说明，json格式',
  `api_id` int(10) DEFAULT NULL COMMENT '所属接口',
  `dec` varchar(100) DEFAULT NULL COMMENT '字段说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `api_return` WRITE;
/*!40000 ALTER TABLE `api_return` DISABLE KEYS */;

INSERT INTO `api_return` (`id`, `name`, `must`, `value`, `api_id`, `dec`)
VALUES
	(1,'username',1,'[{\"value\":1,\"dec\":\"错误的时候\"}]',5,'用户姓名'),
	(5,'username',1,'[{\"value\":1,\"dec\":\"错误的时候\"}]',10,'用户姓名'),
	(6,'username',1,'[{\"value\":1,\"dec\":\"错误的时候\"}]',11,'用户姓名'),
	(7,'username',1,'[{\"value\":1,\"dec\":\"错误的时候\"}]',12,'用户姓名'),
	(11,'username',1,'[{\"value\":1,\"dec\":\"错误的时候\"}]',8,'用户姓名');

/*!40000 ALTER TABLE `api_return` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table log
# ------------------------------------------------------------

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



# Dump of table project
# ------------------------------------------------------------

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;

INSERT INTO `project` (`id`, `name`, `dec`, `version`, `type`, `create_time`, `update_time`, `create_userId`)
VALUES
	(1,'CAPY协作','项目描述','1.0.0','nodejs',NULL,'2017-04-09 13:45:33',NULL),
	(2,'白板','白板描述','2.1.4','js',NULL,'2017-04-09 13:45:49',NULL),
	(3,'修改','这是修改之后的描述','3.0.1',NULL,NULL,'2017-04-09 15:20:29',NULL),
	(4,'修改','这是修改之后的描述',NULL,NULL,NULL,'2017-04-09 15:24:43',NULL),
	(5,'鲁班','成吉思汗',NULL,NULL,NULL,'2017-04-09 15:25:10',NULL),
	(6,'惨痛','成吉思汗',NULL,NULL,NULL,'2017-04-09 15:26:55',NULL),
	(7,'惨痛','成吉思汗',NULL,NULL,NULL,'2017-04-09 15:27:34',NULL),
	(8,'惨痛','成吉思汗',NULL,NULL,NULL,'2017-04-09 15:29:23',1),
	(9,'医学','成吉思汗',NULL,NULL,NULL,'2017-04-09 15:29:42',2);

/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table project_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project_user`;

CREATE TABLE `project_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL,
  `project_id` int(10) DEFAULT NULL,
  `role` varchar(255) DEFAULT '' COMMENT '角色',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `project_user` WRITE;
/*!40000 ALTER TABLE `project_user` DISABLE KEYS */;

INSERT INTO `project_user` (`id`, `user_id`, `project_id`, `role`)
VALUES
	(1,1,1,''),
	(2,1,2,''),
	(3,1,3,''),
	(4,2,1,''),
	(5,2,3,''),
	(6,2,2,'');

/*!40000 ALTER TABLE `project_user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `phone`, `username`, `password`, `email`, `realname`, `create_time`)
VALUES
	(1,'123','admin','admin',NULL,'ssm',NULL),
	(2,'15588076508','sumi','new','ssmin3@163.com',NULL,NULL);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
