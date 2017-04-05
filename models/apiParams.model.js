/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('api_params', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: ""
		},
		type: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: ""
		},
		example: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: ""
		},
		remark: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: ""
		},
		value: {
			type: DataTypes.STRING(200),
			allowNull: true,
			defaultValue: ""
		}
	}, {
		tableName: 'api_params',
		timestamps: false
	});
};
