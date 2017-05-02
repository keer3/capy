/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('log', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		type: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: ""
		},
		username: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: ""
		},
		project: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		operation: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: ""
		},
		desc: {
			type: DataTypes.STRING(200),
			allowNull: true,
			defaultValue: ""
		},
		time: {
			type: DataTypes.TIME,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'log',
		timestamps: false
	});
};
