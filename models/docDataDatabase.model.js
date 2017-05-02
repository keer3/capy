/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('doc_data_database', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			defaultValue: ""
		},
		version: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		dec: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		update_time: {
			type: DataTypes.TIME,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		create_time: {
			type: DataTypes.TIME,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		project_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		}
	}, {
		tableName: 'doc_data_database',
		timestamps: false
	});
};
