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
			defaultValue: ""
		},
		url: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: ""
		},
		type: {
			type: DataTypes.STRING(10),
			allowNull: false,
			defaultValue: ""
		},
		dec: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: ""
		},
		create_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		update_time: {
			type: DataTypes.TIME,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		create_user: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ""
		},
		update_user: {
			type: DataTypes.STRING(0),
			allowNull: true,
			defaultValue: ""
		},
		group_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		protocol: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: ""
		}
	}, {
		tableName: 'api',
		timestamps: false
	});
};
