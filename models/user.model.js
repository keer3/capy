/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		realname: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		phone: {
			type: DataTypes.STRING(15),
			allowNull: false
		},
		create_time: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'user',
		timestamps: false
	});
};
