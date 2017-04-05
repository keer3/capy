/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('api_return', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ""
		},
		required: {
			type: DataTypes.INTEGER(2),
			allowNull: false
		},
		value: {
			type: DataTypes.STRING(200),
			allowNull: true,
			defaultValue: ""
		},
		success_return: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		error_return: {
			type: DataTypes.STRING(0),
			allowNull: true
		},
		api_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		}
	}, {
		tableName: 'api_return',
		timestamps: false
	});
};
