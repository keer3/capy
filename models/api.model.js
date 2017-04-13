/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('api', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: ''
		},
		url: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: ''
		},
		type: {
			type: DataTypes.STRING(10),
			allowNull: false,
			defaultValue: ''
		},
		dec: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: ''
		},
		protocol: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		project_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		group_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		create_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		update_time: {
			type: DataTypes.TIME,
			allowNull: true,
			defaultValue: 'sequelize.literal(\'CURRENT_TIMESTAMP\')'
		},
		create_userId: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		update_userId: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		}
	}, {
		tableName: 'api',
		timestamps: false
	});
};
