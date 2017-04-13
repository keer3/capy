/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		phone: {
			type: DataTypes.STRING(15),
			allowNull: false,
			defaultValue: ''
		},
		username: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		realname: {
			type: DataTypes.STRING(20),
			allowNull: true
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
