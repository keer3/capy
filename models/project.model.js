/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('project', {
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
		dec: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		version: {
			type: DataTypes.STRING(15),
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(15),
			allowNull: true
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
		create_userId: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		}
	}, {
		tableName: 'project',
		timestamps: false
	});
};
